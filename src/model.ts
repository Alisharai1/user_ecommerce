
export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: GENDER,
    password: string,
    phone: string,
    createdAt: Date,
    updatedAt: Date
}

export enum GENDER {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}