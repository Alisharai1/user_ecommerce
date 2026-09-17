import { GENDER, User } from "../model";
import { IUserRepo } from "../repo/user-repo-interface";
import { IUserService } from "./user-service-interface";
import { UserNotFoundException } from "../exception/user-not-found";
import { DuplicateUserException } from "../exception/duplicate-user";
import { v4 } from "uuid";
export class UserService implements IUserService {

    private readonly userRepo: IUserRepo
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo

    }
    async getUserById(id: string): Promise<User> {
        const user = await this.userRepo.getUserById(id)
        if (!user) {
            throw new UserNotFoundException("user not found")
        }
        return user
    }
    
    getAllUsers(_input: { limit: number; offset: number; }): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async createUser(input: { firstName: string, lastName: string, email: string, gender: GENDER, password: string, phone?: string }): Promise<User> {
        const existingUser = await this.userRepo.getUserByEmail(input.email)
        if (existingUser) {
            throw new DuplicateUserException("user already exist")
        }
        const newUser = await this.userRepo.createUser({...input,
            id: v4(),
            createdAt: new Date(),
            updatedAt: new Date()
        })
        return {...newUser}
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepo.getUserByEmail(email)
        if (!user) {
            throw new UserNotFoundException("user not found")
        }
        return user
    }

    updateUser(_input: { id: string; firstName: string; lastName: string; phone: string; }): Promise<User> {
        throw new Error("Method not implemented.");
    }
    deleteUser(_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}