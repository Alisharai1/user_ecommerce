import { Express } from "express";
import { UserController } from "./controller/userController";
import { UserService } from "./service/user-service";
import { UserRepo } from "./repo/user-repo";

export function bootstrap(app: Express) {
    const userRepo = new UserRepo()
    const userService = new UserService(userRepo)
    const router = UserController.start(userService)

    app.use('/user', router)

}