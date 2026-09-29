import { Express } from 'express';
import { UserController } from './controller/userController';
import { UserService } from './service/user-service';
import { UserRepo } from './repo/user-repo';
import { EmailProvider } from './provider/email-provider';

export function bootstrap(app: Express) {
    const userRepo = new UserRepo();
    const emailProvider = new EmailProvider();
    const userService = new UserService(userRepo, emailProvider);
    const router = UserController.start(userService);

    app.use('/user', router);
}