import { User } from "../model";

export interface IUserRepo {

    getUserById(id: string): Promise<User | null>

    query(): Promise<User[]>

    createUser(): Promise<User>

    getUserByEmail(): Promise<User | null>

    updateUser(input: {
        id: string, firstName: string, lastName: string, phone: string
    }): Promise<User>

    deleteUser(id: string): Promise<boolean>

}