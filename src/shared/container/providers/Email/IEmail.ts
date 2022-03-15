

export interface IEmail {
  sendEmail(to: string, subject: string, body: string): Promise<void>
}
