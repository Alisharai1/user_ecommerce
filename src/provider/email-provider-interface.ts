export interface IEmailProvider {
    sendEmail(input: { email: string, html: string, subject: string }): Promise<void>
}