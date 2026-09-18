import { GENDER, User } from "../model"


export interface IUserService {
    getUserById(id: string): Promise<User>

    getAllUsers(input: { limit?: number, page: number }): Promise<User[]>

    createUser(input: { firstName: string, lastName: string, email: string, gender: GENDER, password: string, phone?: string }): Promise<User>

    getUserByEmail(email: string): Promise<User>

    updateUser(input: {
        id: string, firstName: string, lastName: string}): Promise<User|null>

    deleteUser(id: string): Promise<boolean>

}