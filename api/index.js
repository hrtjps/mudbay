var fs = require("fs");
var puppeteer = require('puppeteer');
var handlebars = require("handlebars");
var path = require("path");

export default async function (req, res, next) {
  try {
    var pdfBuffer = await createPDF(req.body);
    // res.setHeader(
    //   "Content-disposition",
    //   "attachment; filename=mylist.pdf"
    // );
    res.set({"Content-Type": "application/pdf", 'Content-Length': pdfBuffer.length});
    res.send(pdfBuffer);
  } catch (err) {
    console.log('Error printting documents', err);
  }
}
function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer.from(bitmap).toString('base64');
}
async function createPDF(d) {
  var templateHtml = fs.readFileSync(path.join(process.cwd(), 'server/pdf_template.html'), 'utf8');
  var header ='<div class="logo">' 
  + '<img src="data:image/png;base64,'+base64_encode("server/mudbay_pdf_logo.png")+'" class="header-logo"/>'
  + '</div>'
  + '<div class="header-info">'
  + '(907) 314-0985 <span>|</span> info@mudbaylumberco.com <span>|</span> PO Box 1594, Haines, Alaska 99827'
  + '</div>'
  + '<h1>CUT LIST</h1>'
  + '<div class="sub-title">'
  + '  CUSTOMER INFORMATION:'
  + '</div>'
  + '<div class="customer-info">'
  + '  <div class="info">'
  + '    <div class="label">Date Generated:</div>'
  + '    <div class="value">'+(new Date()).toLocaleDateString()+'</div>'
  + '  </div>'
  + '  <div class="info">'
  + '    <div class="label">Name:</div>'
  + '    <div class="value">'+d.user.name+'</div>'
  + '  </div>'
  + '  <div class="info">'
  + '    <div class="label">Email:</div>'
  + '    <div class="value">'+d.user.email+'</div>'
  + '  </div>'
  + '  <div class="info">'
  + '    <div class="label">Phone:</div>'
  + '    <div class="value">'+d.user.phone+'</div>'
  + '  </div>'
  + '</div>'
  
  var data="";
  var subTotal;
  d.bodyData.forEach(element => {
    data += '<div class="item">'
          + '  <div class="item-name">'
          + '    <span>'+element.title+'</span>'
          + '    <span class="price">Price</span>'
          + '  </div>'
    subTotal = 0;
    element.species.forEach(el => {
      if(el.quantity>0) {
        subTotal +=element.dimensions[el.dimension].prices[el.length] * el.quantity;
        data +=' <div class="list">'
            + '    <div class="info">'
            + '      <div class="label">Species:</div>'
            + '      <div class="value">'+element.constSpecies[0]+'</div>'
            + '    </div>'
            + '    <div class="info">'
            + '      <div class="label">Dimension:</div>'
            + '      <div class="value">'+element.dimensions[el.dimension].dimension+'</div>'
            + '    </div>'
            + '    <div class="info">'
            + '      <div class="label">Length:</div>'
            + '      <div class="value">'+el.length+'</div>'
            + '    </div>'
            + '    <div class="info">'
            + '      <div class="label">Quantity:</div>'
            + '      <div class="value">'+el.quantity+'</div>'
            + '    </div>'
            + '    <div class="info">'
            + '      <div class="price">$'+ Math.round(element.dimensions[el.dimension].prices[el.length] * el.quantity *100)/100+'</div>'
            + '    </div>'
            + '  </div>'
            + '</div>'
      }
    })
    data += '  <div class="sub-total">Sub-Total: $'+subTotal+'</div>'
    data += '<div class="add-info">Additional Comment</div>'
    data += '<div>'+element.additionalNote+'</div>'
    data += "</div>"
  })
  var template = handlebars.compile(templateHtml+header+data+"</body></html>");
  
  var html = template(data);

	var milis = new Date();
	milis = milis.getTime();

	var pdfPath = path.join(`${milis}.pdf`);

	var options = {
		// width: '1230px',
		headerTemplate: "<p></p>",
		footerTemplate: "<p></p>",
		displayHeaderFooter: false,
		margin: {
			top: "30px",
			bottom: "30px"
		},
		printBackground: true,
    path: pdfPath,
    format: 'A4'
	}

	var browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true
	});

	var page = await browser.newPage();
	
  await page.emulateMedia('screen')
  await page.setContent(html);
	var pdf = await page.pdf(options);
  await browser.close();
  fs.unlinkSync(pdfPath);
  
  return pdf;
}
