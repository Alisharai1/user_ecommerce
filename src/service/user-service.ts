import { GENDER, User } from "../model";
import { IUserRepo } from "../repo/user-repo-interface";
import { IUserService } from "./user-service-interface";
import { UserNotFoundException } from "../exception/user-not-found";
import { DuplicateUserException } from "../exception/duplicate-user";
import { v4 } from "uuid";
import { InvalidCredentialError } from "../exception/Invalid-cred";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export class UserService implements IUserService {

    private readonly userRepo: IUserRepo
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo

    }

    async forgotPassword(input: { email: string }): Promise<void> {
        const existingUser = await this.userRepo.getUserByEmail(input.email)
        if (!existingUser) {
            return
        }
        


    }

    async login(input: { email: string; password: string; }): Promise<{ token: string; userId: string }> {
        const existingUser = await this.userRepo.getUserByEmail(input.email)
        if (!existingUser || !existingUser.password) {
            throw new InvalidCredentialError("invalid credentials")
        }
        const output = await bcryptjs.compare(input.password, existingUser.password)
        if (!output) {
            throw new InvalidCredentialError("invalid credentials")
        }
        const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET!, { expiresIn: '1d' })
        return { token, userId: existingUser.id }
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepo.getUserById(id)
        if (!user) {
            throw new UserNotFoundException("user not found")
        }
        return user
    }

    async getAllUsers(input: { limit: number; page: number; }): Promise<User[]> {
        const offset = input.limit * (input.page - 1)
        const users = await this.userRepo.query({ limit: input.limit || 5, offset })
        return users.map((user) => user)
    }

    async createUser(input: { firstName: string, lastName: string, email: string, gender: GENDER, password: string, phone?: string }): Promise<User> {
        const existingUser = await this.userRepo.getUserByEmail(input.email)
        if (existingUser) {
            throw new DuplicateUserException("user already exist")
        }
        const newUser = await this.userRepo.createUser({
            ...input,
            id: v4(),
            createdAt: new Date(),
            updatedAt: new Date()
        })
        return { ...newUser }
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepo.getUserByEmail(email)
        if (!user) {
            throw new UserNotFoundException("user not found")
        }
        return user
    }

    async updateUser(input: { id: string; firstName: string; lastName: string; }): Promise<User | null> {
        const user = await this.userRepo.getUserById(input.id)
        if (!user) {
            throw new UserNotFoundException("user not found")
        }
        const updatedUser = await this.userRepo.updateUser(input)
        if (!updatedUser) {
            throw new UserNotFoundException("user not found")
        }
        return { ...updatedUser }
    }

    async deleteUser(id: string): Promise<boolean> {
        const user = await this.userRepo.getUserById(id)
        if (!user) {
            throw new UserNotFoundException("user not found")
        }
        return await this.userRepo.deleteUser(id)
    }

}