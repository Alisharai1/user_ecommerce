import { Gender } from "../enum-gender"

export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: Gender,
    password: string,
    phone: string,
    createdAt: Date,
    updatedAt: Date
}