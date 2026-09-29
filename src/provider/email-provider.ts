import nodemailer, { Mail, SMTPSentMessageInfo, SMTPTransportOptions } from 'nodemailer';
import { IEmailProvider } from './email-provider-interface';

export class EmailProvider implements IEmailProvider {
    private readonly transporter: Mail<SMTPSentMessageInfo, SMTPTransportOptions>;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        this.transporter.verify();
    }

    async sendEmail(input: { email: string; html: string; subject: string; }): Promise<void> {
        console.log(input);

        const body = await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: input.email,
            html: input.html,
            subject: input.subject,
        });
        console.log(body);

    }

    async sendOtpEmail(input: { email: string; otp: string; }): Promise<void> {

        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: input.email,
            subject: 'Password Reset OTP',
            html: `<h1> Your password reset OTP is ${input.otp}. It will expire in 10 minutes. </h1>`,
        });
    }


}