export class InvalidOtpException extends Error {
    constructor(message: string) {
        super(message)
    }
}