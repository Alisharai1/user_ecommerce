import { GENDER, User } from "../model";
import { IUserRepo } from "../repo/user-repo-interface";
import { IUserService } from "./user-service-interface";
import { UserNotFoundException } from "../exception/user-not-found";
import { DuplicateUserException } from "../exception/duplicate-user";
import { v4 } from "uuid";
import { InvalidCredentialError } from "../exception/Invalid-cred";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { randomInt } from "crypto";
import { InvalidOtpException } from "../exception/Invalidotp";
import { OtpExpiredException } from "../exception/otpexpired";
import { OtpNotFoundException } from "../exception/otp-not-found";

const salt = bcryptjs.genSaltSync(10);
export class UserService implements IUserService {

    private readonly userRepo: IUserRepo
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo
    }

    async updatePassword(input: { email: string; otp: string, newPassword: string; }): Promise<string> {
        const existingUser = await this.userRepo.getUserByEmail(input.email)
        if (!existingUser) {
            throw new UserNotFoundException("user not found")
        }
        if (!existingUser.otp) {
            throw new OtpNotFoundException("OTP not found")
        }
        if (existingUser.otp !== input.otp) {
            throw new InvalidOtpException("invalid otp")
        }
        if (!existingUser.otpExpiryTime) {
            throw new Error("otp expiry time not found")
        }

        if (new Date() > existingUser.otpExpiryTime) {
            throw new OtpExpiredException("otp has expired")
        }
        const hashedPassword = await bcryptjs.hash(input.newPassword, 10);

        await this.userRepo.updatePassword({ id: existingUser.id, hashedPassword: hashedPassword })

        return "Password updated successfully";
    }

    async forgotPassword(input: { email: string }): Promise<string> {
        const existingUser = await this.userRepo.getUserByEmail(input.email)
        if (!existingUser) {
            throw new UserNotFoundException("user not found")
        }

        const otp = randomInt(100000, 1000000).toString();

        const otpExpiryTime = new Date(Date.now() + 10 * 60 * 1000)

        await this.userRepo.saveOtp({ id: existingUser.id, otp, otpExpiryTime })

        return "otp generated successfully"

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
        const limit = input.limit || 5;
        const offset = limit * (input.page - 1)
        const users = await this.userRepo.query({ limit: input.limit || 5, offset })
        return users.map((user) => user)
    }

    async createUser(input: { firstName: string, lastName: string, email: string, gender: GENDER, password: string, phone?: string }): Promise<User> {
        const existingUser = await this.userRepo.getUserByEmail(input.email)
        if (existingUser) {
            throw new DuplicateUserException("user already exist")
        }
        const hash = bcryptjs.hashSync(input.password, salt);

        const newUser = await this.userRepo.createUser({
            ...input,
            id: v4(),
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date(),
            otpExpiryTime: null,
            otp: null
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