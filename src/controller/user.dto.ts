import { object, number, string } from "yup"
import { GENDER } from "../model"

export const forgotPasswordSchema = object({
    email: string().email().required()
})

export const createUserBodySchema = object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
    gender: string().required().oneOf(Object.values(GENDER)),
    password: string().required().min(8).max(20),
    phone: string()
})

export const getUserByIdParamsSchema = object({
    id: string().uuid().required()
})

export const getAllUsersSchema = object({
    limit: number().positive().integer().default(5),
    page: number().positive().integer().default(1)
})

export const getUserByEmailQuerySchema = object({
    email: string().email().required(),
})

export const updateUserBodySchema = object({
    id: string().uuid().required(),
    firstName: string().required(),
    lastName: string().required(),
})

export const deleteUserByIdParamsSchema = object({
    id: string().uuid().required()
})

