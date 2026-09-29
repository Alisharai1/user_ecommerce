export class InvalidCredentialErrorException extends Error {
    constructor(message: string) {
        super(message);
    }
}