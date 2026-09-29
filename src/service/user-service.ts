import { GENDER, User } from '../model';
import { IUserRepo } from '../repo/user-repo-interface';
import { IUserService } from './user-service-interface';
import { UserNotFoundException } from '../exception/user-not-found';
import { DuplicateUserException } from '../exception/duplicate-user';
import { v4 } from 'uuid';
import { InvalidCredentialErrorException } from '../exception/Invalid-cred';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomInt } from 'crypto';
import { InvalidOtpException } from '../exception/Invalidotp';
import { OtpExpiredException } from '../exception/otpexpired';
import { OtpNotFoundException } from '../exception/otp-not-found';
import { IEmailProvider } from '../provider/email-provider-interface';

const salt = bcryptjs.genSaltSync(10);
export class UserService implements IUserService {

    private readonly userRepo: IUserRepo;
    private readonly emailProvider: IEmailProvider;
    constructor(userRepo: IUserRepo, emailProvider: IEmailProvider) {
        this.userRepo = userRepo;
        this.emailProvider = emailProvider;
    }

    async updatePassword(input: { email: string; otp: string, newPassword: string; }): Promise<void> {
        const existingUser = await this.userRepo.getUserByEmail(input.email);
        if (!existingUser) {
            throw new UserNotFoundException('user not found');
        }
        if (!existingUser.otp || !existingUser.otpExpiryTime) {
            throw new OtpNotFoundException('OTP not found');
        }
        if (existingUser.otp !== input.otp) {
            throw new InvalidOtpException('invalid otp');
        }
        if (new Date() > existingUser.otpExpiryTime) {
            throw new OtpExpiredException('otp has expired');
        }
        const hashedPassword = await bcryptjs.hash(input.newPassword, 10);

        await this.userRepo.updatePassword({ id: existingUser.id, hashedPassword: hashedPassword });

        await this.userRepo.clearOtp(existingUser.id);

    }

    async forgotPassword(input: { email: string }): Promise<void> {
        const existingUser = await this.userRepo.getUserByEmail(input.email);
        if (!existingUser) {
            throw new UserNotFoundException('user not found');
        }

        const otp = randomInt(100000, 1000000).toString();

        const otpExpiryTime = new Date(Date.now() + 10 * 60 * 1000);

        await this.userRepo.saveOtp({ id: existingUser.id, otp, otpExpiryTime });

        await this.emailProvider.sendEmail({
            email: input.email,
            html: `<h1> Hello ${existingUser.firstName} ${existingUser.lastName} user created </h1>`,
            subject: 'Password Reset OTP',
        });

    }

    async login(input: { email: string; password: string; }): Promise<{ token: string; userId: string }> {
        const existingUser = await this.userRepo.getUserByEmail(input.email);
        if (!existingUser || !existingUser.password) {
            throw new InvalidCredentialErrorException('invalid credentials');
        }
        const output = await bcryptjs.compare(input.password, existingUser.password);
        if (!output) {
            throw new InvalidCredentialErrorException('invalid credentials');
        }
        const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
        return { token, userId: existingUser.id };
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepo.getUserById(id);
        if (!user) {
            throw new UserNotFoundException('user not found');
        }
        return user;
    }

    async getAllUsers(input: { limit: number; page: number; }): Promise<User[]> {
        const limit = input.limit || 5;
        const offset = limit * (input.page - 1);
        const users = await this.userRepo.query({ limit: input.limit || 5, offset });
        return users.map((user) => user);
    }

    async createUser(input: { firstName: string, lastName: string, email: string, gender: GENDER, password: string, phone?: string }): Promise<User> {
        const existingUser = await this.userRepo.getUserByEmail(input.email);
        if (existingUser) {
            throw new DuplicateUserException('user already exist');
        }
        const hash = bcryptjs.hashSync(input.password, salt);

        const newUser = await this.userRepo.createUser({
            ...input,
            id: v4(),
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date(),
            otpExpiryTime: null,
            otp: null,
        });

        await this.emailProvider.sendEmail({ email: newUser.email, subject: 'welcome onboard', html: `<h2> ${newUser.firstName} ${newUser.lastName}User has been created</h2>` });
        return { ...newUser };
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepo.getUserByEmail(email);
        if (!user) {
            throw new UserNotFoundException('user not found');
        }
        return user;
    }

    async updateUser(input: { id: string; firstName: string; lastName: string; }): Promise<User | null> {
        const user = await this.userRepo.getUserById(input.id);
        if (!user) {
            throw new UserNotFoundException('user not found');
        }
        const updatedUser = await this.userRepo.updateUser(input);
        if (!updatedUser) {
            throw new UserNotFoundException('user not found');
        }
        return { ...updatedUser };
    }

    async deleteUser(id: string): Promise<boolean> {
        const user = await this.userRepo.getUserById(id);
        if (!user) {
            throw new UserNotFoundException('user not found');
        }
        return await this.userRepo.deleteUser(id);
    }

}