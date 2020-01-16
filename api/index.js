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

async function createPDF(data) {
  var templateHtml = fs.readFileSync(path.join(process.cwd(), 'server/pdf_template.html'), 'utf8');
  var template = handlebars.compile(templateHtml);
  console.log(data)
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
			top: "10px",
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
	
  await page.setContent(html);
	var pdf = await page.pdf(options);
  await browser.close();
  fs.unlinkSync(pdfPath);
  
  return pdf;
}
