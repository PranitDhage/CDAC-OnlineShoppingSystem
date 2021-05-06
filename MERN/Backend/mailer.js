const nodemailer = require('nodemailer');
const fs = require('fs');

function sendEmail(subject, link, email, callback) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'panky110598@gmail.com',
			pass: 'PankajChaudhari@98'
		}
	});

	//const contents = '' + fs.readFileSync('./email_templates/' + template)
	const mailOptions = {
		from: 'panky110598@gmail.com',
		to: email,
		subject: subject,
		html: link
	};

	transporter.sendMail(mailOptions, function(error, info) {
		console.log(error);
		console.log(info);

		callback(error, info);
	});
}

module.exports = {
	sendEmail: sendEmail
};
