const nodemailer = require("nodemailer");
var fs = require("fs");
var handlebars = require("handlebars");
var path = require("path");

function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer.from(bitmap).toString('base64');
}
export default async function (req, res, next) {
  
  console.log('1. ---------------------');
  let transporter = nodemailer.createTransport({
    host: "smtp.fastmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'jeremy@northcreativedesign.com', // generated ethereal user
      pass: 'd8d57f3v3cuvl72s' // generated ethereal password
    }
  });

  console.log(req.body)

  console.log('2. ---------------------');
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
            + '    <div class="value">'+req.body.user.name+'</div>'
            + '  </div>'
            + '  <div class="info">'
            + '    <div class="label">Email:</div>'
            + '    <div class="value">'+req.body.user.email+'</div>'
            + '  </div>'
            + '  <div class="info">'
            + '    <div class="label">Phone:</div>'
            + '    <div class="value">'+req.body.user.phone+'</div>'
            + '  </div>'
            + '</div>'

  var data="";
  var subTotal;
  req.body.bodyData.forEach(element => {
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
  console.log(transporter);
  console.log('3. ---------------------');
  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      from: "jeremy@northcreativedesign.com", // sender address
      to: "jeremy@northcreativedesign.com", // list of receivers
      subject: 'New Cutlist Form', // Subject line
      text: req.body.user.timeline, // plain text body
      html: html // html body
    });
    console.log(info);
    console.log('4. completed');
    res.json({
      status: "success",
      message: "User Found!!!",
      data: info
    });
  } catch (err) {
    console.log(err);
    console.log('5. error');
    res.json({
      status: "error",
      message: err.toString(),
    });
  }
  
}
