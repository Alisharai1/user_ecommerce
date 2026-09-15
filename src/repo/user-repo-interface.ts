import { User } from "../model";

export interface IUserRepo {

    getUserById(id: string): Promise<User | null>

    query(input: { limit: number, offset: number }): Promise<User[]>

    createUser(input: User): Promise<User>

    getUserByEmail(email: string): Promise<User | null>

    updateUser(input: {
        id: string, firstName: string, lastName: string, phone: string
    }): Promise<User>

    deleteUser(id: string): Promise<boolean>

}