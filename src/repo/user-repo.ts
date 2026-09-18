import { User } from "../model";
import { IUserRepo } from "./user-repo-interface";
import { UserDb } from "./user-model";

export class UserRepo implements IUserRepo {

    async getUserById(id: string): Promise<User | null> {
        const user = await UserDb.findOne({ where: { id: id } })
        if (!user) {
            return null
        }
        return user.toJSON<User>()
    }

    async query(input: { limit: number, offset: number }): Promise<User[]> {
        const users = await UserDb.findAll(input)
        return users.map((user) => user.toJSON<User>())
    }

    async createUser(input: User): Promise<User> {
        const user = await UserDb.create({ firstName: input.firstName, lastName: input.lastName, email: input.email, gender: input.gender, password: input.password, phone: input.phone })
        return user.toJSON<User>()
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await UserDb.findOne({ where: { email: email } })
        if (!user) {
            return null
        }
        return user.toJSON<User>()
    }

    async updateUser(input: { id: string; firstName: string; lastName: string; }): Promise<User | null> {
        const user = await UserDb.findOne({ where: { id: input.id } })
        if (!user) {
            return null
        }
        const updatedUser = await user.update({ firstName: input.firstName, lastName: input.lastName })
        return updatedUser.toJSON<User>()
    }

    async deleteUser(id: string): Promise<boolean> {
        const user = await UserDb.findByPk(id)
        if (!user) {
            return false
        }
        await UserDb.destroy({ where: { id: id } })
        return true
    }



}