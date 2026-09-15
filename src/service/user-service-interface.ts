import { User } from "../model"


export interface IUserService {
    getUserById(id: string): Promise<User>

    getAllUsers(input: { limit: number, offset: number }): Promise<User[]>

    createUser(input: User): Promise<User>

    getUserByEmail(email: string): Promise<User>

    updateUser(input: {
        id: string, firstName: string, lastName: string, phone: string
    }): Promise<User>

    deleteUser(id: string): Promise<boolean>

}