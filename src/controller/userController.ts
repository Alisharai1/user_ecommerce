import { IUserService } from "../service/user-service-interface";
import { Request, Response } from "express";
import {
    createUserBodySchema,
    getUserByIdParamsSchema,
    getAllUsersSchema,
    getUserByEmailQuerySchema,
    updateUserBodySchema,
    deleteUserByIdParamsSchema
}
    from "./user.dto";
import { ValidationError } from "yup";
import { Router } from "express";
import { DuplicateUserException } from "../exception/duplicate-user";
import { UserNotFoundException } from "../exception/user-not-found";


export class UserController {

    private readonly userService: IUserService

    constructor(userService: IUserService) {
        this.userService = userService
    }
    static start(userService: IUserService) {
        const router = Router()
        const controller = new UserController(userService)
        router.post('/', controller.createUser)
        router.get('/useremail', controller.getUserByEmail)
        router.get('/:id', controller.getUserById)
        router.get('/', controller.getAllUsers)
        router.put('/:id', controller.updateUser)
        router.delete('/:id', controller.deleteUser)

        return router
    }


    createUser = async (req: Request, res: Response) => {
        try {
            const input = createUserBodySchema.validateSync(req.body, { abortEarly: false, strict: true })

            const user = await this.userService.createUser(input)
            res.status(200).json(user)
        } catch (error) {
            console.log("hiiiiii", error);

            if (error instanceof ValidationError) {
                res.status(400).json(error.errors)
            }
            else if (error instanceof DuplicateUserException) {
                res.status(400).json({ message: "duplicate user found" })
            }
            else {
                console.log("hello", error);

                res.status(500).json({ message: "internal server error" })
            }
        }
    }

    getUserById = async (req: Request, res: Response) => {
        try {
            const input = getUserByIdParamsSchema.validateSync(req.params, { abortEarly: false, strict: true })

            const user = await this.userService.getUserById(input.id)
            res.status(200).json(user)

        } catch (error) {
            console.log(error);

            if (error instanceof ValidationError) {
                res.status(400).json(error.errors)
            }
            else if (error instanceof UserNotFoundException) {
                res.status(400).json({ message: "user not found" })
            }
            else {
                console.log("heyyyy", error);

                res.status(500).json({ message: "internal server error" })
            }
        }
    }

    getUserByEmail = async (req: Request, res: Response) => {
        try {
            const input = getUserByEmailQuerySchema.validateSync(req.query, { abortEarly: false, strict: true })
            const user = await this.userService.getUserByEmail(input.email)
            res.status(200).json(user)
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).json(error.errors)
            }
            else if (error instanceof UserNotFoundException) {
                res.status(400).json({ message: "user not found" })
            }
            else {
                res.status(500).json({ message: "internal server error" })
            }
        }
    }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const input = getAllUsersSchema.validateSync(req.query, { abortEarly: false })
            const users = await this.userService.getAllUsers(input)
            res.status(200).json(users)
        } catch (error) {
            console.log("today", error);

            if (error instanceof ValidationError) {
                res.status(400).json(error.errors)
            }
            else {
                res.status(500).json({ message: "internal server error" })
            }
        }
    }

    deleteUser = async (req: Request, res: Response) => {
        try {
            const input = deleteUserByIdParamsSchema.validateSync(req.params, { abortEarly: false, strict: true })

            await this.userService.deleteUser(input.id)
            res.status(200).json({ message: "user deleted successfully" })
        } catch (error) {
            console.log(error);

            if (error instanceof ValidationError) {
                res.status(400).json(error.errors)
            }
            else if (error instanceof UserNotFoundException) {
                res.status(400).json({ message: "user not found" })
            }
            else {
                res.status(500).json({ message: "internal server error" })
            }
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const input = updateUserBodySchema.validateSync(req.body, { abortEarly: false, strict: true })
            const updatedUser = await this.userService.updateUser(input)
            res.status(200).json(updatedUser)
        } catch (error) {
            console.log(error);
            
            if (error instanceof ValidationError) {
                res.status(400).json(error.errors)
            }
            else if (error instanceof UserNotFoundException) {
                res.status(400).json({ message: "user not found" })
            }
            else {
                res.status(500).json({ message: "internal server error" })
            }
        }
    }
}


