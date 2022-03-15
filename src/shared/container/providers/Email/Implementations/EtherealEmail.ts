import { injectable } from "tsyringe";
import { IEmail } from "../IEmail";
import nodemailer, { Transporter } from "nodemailer"

@injectable()
export class EtheralEmail implements IEmail {
  private client!: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })
      this.client = transporter
    })
    .catch(e => {
      console.log(e)
    }) // como não é possivel usar async no constructor colocamos o .then()
  }
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: 'Rentex <noreplay@rentex.com.br>',
      subject,
      text: body,
      html: body
    })
    console.log(message)
    console.log(nodemailer.getTestMessageUrl(message))

  }
}
