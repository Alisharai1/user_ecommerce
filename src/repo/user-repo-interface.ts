import { User, UserCredential } from '../model';
export interface IUserRepo {

    getUserById(id: string): Promise<User | null>

    query(input: { limit: number, offset: number }): Promise<User[]>

    createUser(input: User & UserCredential): Promise<User>

    getUserByEmail(email: string): Promise<User | null>

    updateUser(input: {
        id: string, firstName: string, lastName: string
    }): Promise<User | null>

    getUserCredentialById(id: string): Promise<UserCredential | null>

    deleteUser(id: string): Promise<boolean>

    saveOtp(input: { id: string, otp: string, otpExpiryTime: Date }): Promise<void>

    updatePassword(input: { id: string, hashedPassword: string }): Promise<void>

    clearOtp(id: string): Promise<void>;

}