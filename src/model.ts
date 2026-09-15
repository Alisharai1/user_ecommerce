
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

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}