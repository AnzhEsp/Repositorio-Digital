const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'noreplay_repositorio@cuautla.tecnm.mx',
    pass: '*Da6Mm=nM'
  }
})

module.exports = transporter
