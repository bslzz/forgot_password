import nodemailer from 'nodemailer'

let testAccount = {
  user: 'xxx3vdiujojri4dp@ethereal.email',
  pass: 'EcJUFcWTn9HYKJUrnQ'
}

export let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass // generated ethereal password
  }
})
