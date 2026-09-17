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

    query(): Promise<User[]> {
        throw new Error("Method not implemented.");
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
    
    updateUser(_input: { id: string; firstName: string; lastName: string; phone: string; }): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }



}