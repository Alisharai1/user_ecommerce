import { User } from "../model";
import { IUserService } from "./user-service-interface";
import { IUserRepo } from "../repo/user-repo-interface";

export class UserService implements IUserService {

    private readonly userRepo: IUserRepo
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo
    }
    getUserById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getAllUsers(input: { limit: number; offset: number; }): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    createUser(input: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    updateUser(input: { id: string; firstName: string; lastName: string; phone: string; }): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}