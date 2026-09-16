import { IUserService } from "../service/user-service-interface";
import { Request, Response } from "express";
import {
    createUserBodySchema,
    // getUserByIdParamsSchema,
    // getAllUsersSchema,
    // getUserByEmailQuerySchema,
    // updateUserBodySchema,
    // deleteUserByIdParamsSchema
}
    from "./user.dto";
import { ValidationError } from "yup";
import { Router } from "express";


export class UserController {

    private readonly userService: IUserService

    constructor(userService: IUserService) {
        this.userService = userService
    }
    static start(userService: IUserService) {
        const router = Router()
        const controller = new UserController(userService)
        router.post('/', controller.createUser)

        return router
    }


    async createUser(req: Request, res: Response) {
        try {
            await createUserBodySchema.validateSync(req.body, { abortEarly: false, strict: true })
            console.log(this.userService);

        } catch (error) {

            if (error instanceof ValidationError) {
                res.status(400).json(error.errors)
            }
            else {
                res.status(500).json({ message: "internal server error" })
            }
        }
    }



}