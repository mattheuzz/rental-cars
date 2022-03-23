import { injectable } from "tsyringe"
import { IEmail } from "../IEmail"
import aws from 'aws-sdk'
import nodemailer, { Transporter } from "nodemailer"
import handlebars from "handlebars"
import fs from "fs"

@injectable()
export class SESEmail implements IEmail {
  private client!: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_BUCKET_REGION
      })
    })
    // como não é possivel usar async no constructor colocamos o .then()
  }
  async sendEmail(to: string, subject: string, variables: any, path: string): Promise<void> {
     
    const template = fs.readFileSync(path).toString("utf-8")
     const templateParse = handlebars.compile(template)
     const templateHTML = templateParse(variables)

    await this.client.sendMail({
      to,
      from: 'Rentex <noreplay@rentex.com.br>',
      subject,
      html: templateHTML
    })
  }
}