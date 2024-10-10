import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import BaseError from '../errors/base.error.js'

class MailService {
  constructor() {
    dotenv.config()
    this.transport = nodemailer.createTransport({
      port: process.env.SMTP_PORT,
      host: process.env.SMTP_HOST,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  async sendForgotPass(email, confirmationCode) {
    try {
      await this.transport.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Boardify: Forgot password',
        html: `<div>
             <h4>Confirmation code</h4>
             <h1 style={{font-family:bold;}}">${confirmationCode}</h1>
             <p>You can set new password after confirm password above</p>
             <p style={{color:red;}}>This code is availabale within 15 minutes</p>
            </div>`,
      })
    } catch (error) {
      throw BaseError.BadRequest(`SMTP config error: ${error}`)
    }
  }
}

export default new MailService()
