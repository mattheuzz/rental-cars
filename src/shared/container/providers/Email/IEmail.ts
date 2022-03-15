

export interface IEmail {
  sendEmail(to: string, subject: string, variables: any, path: string): Promise<void>
}
