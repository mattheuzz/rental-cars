import { IEmail } from "../IEmail";


export class EtheralEmailInMemory implements IEmail {
  private messages: any[] = []
  async sendEmail(to: string, subject: string, variables: any, path: string): Promise<void> {
    this.messages.push({
      to,
      subject,
      variables,
      path
    })
  }
  
}
