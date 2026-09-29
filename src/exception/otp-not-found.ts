export class OtpNotFoundException extends Error {
    constructor(message: string) {
        super(message);
    }
}