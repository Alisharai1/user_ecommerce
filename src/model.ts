
export type User = {
    otpExpiryTime: Date | null,
    otp: string | null,
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: GENDER,
    password: string|undefined,
    phone?: string,
    createdAt: Date,
    updatedAt: Date
}

export enum GENDER {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}