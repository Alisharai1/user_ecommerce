export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: GENDER,
    phone?: string,
    createdAt: Date,
    updatedAt: Date
}

export type UserCredential = {
    password: string,
    otpExpiryTime: Date | null,
    otp: string | null,
}

export enum GENDER {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}