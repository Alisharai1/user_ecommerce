import { User } from "../model";
import { IUserRepo } from "../repo/user-repo-interface";

import { IUserService } from "./user-service-interface";
export class UserService implements IUserService {

    private readonly userRepo: IUserRepo
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo

    }
    getUserById(_id: string): Promise<User> {
        console.log(this.userRepo);
        throw new Error("Method not implemented.");
    }
    getAllUsers(_input: { limit: number; offset: number; }): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    createUser(_input: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(_email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    updateUser(_input: { id: string; firstName: string; lastName: string; phone: string; }): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}