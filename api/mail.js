const nodemailer = require("nodemailer");
var fs = require("fs");
var handlebars = require("handlebars");
var path = require("path");

export default async function (req, res, next) {
  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  var templateHtml = fs.readFileSync(path.join(process.cwd(), 'server/pdf_template.html'), 'utf8');
  var data="";
  req.body.bodyData.forEach(element => {
    data +="<h2>"+element.title + "</h2>"
    element.species.forEach(el => {
      if(el.quantity>0) {
        data +="<div>dimension: "+ element.dimensions[el.dimension].dimension
          + ", length: " + el.length
          + "', quantity: " + el.quantity 
          + ", prices: $" + Math.round(element.dimensions[el.dimension].prices[el.length] * el.quantity *100)/100
          + "</div>"
      }
    })    
  });
  var template = handlebars.compile(templateHtml+data+"</body></html>");
  
  var html = template(data);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${req.body.user.name}👻" <${req.body.user.email}>`, // sender address
    to: "j.perfectsolution@outlook.com", // list of receivers
    subject: `${req.body.user.building}`, // Subject line
    text: req.body.user.timeline, // plain text body
    html: html // html body
  });
  
  res.json({
    status: "success",
    message: "User Found!!!",
    data: info
  });
}