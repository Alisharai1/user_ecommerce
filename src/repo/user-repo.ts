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
    createUser(): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    updateUser(input: { id: string; firstName: string; lastName: string; phone: string; }): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }



}