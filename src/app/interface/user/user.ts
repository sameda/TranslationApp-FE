export interface UserGetDto {
    companyName: string,
    email: string,
    firstName: string,
    id: number,
    lastName: string,
    lastPasswordResetDate: Date,
    phoneNumber: string,
    username: string
}

export interface UserRegisterDto {
    companyName: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phoneNumber: string,
    username: string
}

export interface UserPatchDto {
    companyName: string,
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
}