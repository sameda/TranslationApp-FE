import { UserGetDto } from "../user/user";

export interface EventGetDto {
    attended,
    creatorEmail,
    dateEnd,
    dateStart,
    description,
    googleId,
    id,
    title,
    user: UserGetDto
}

export interface EventPostDto {
    attended,
    creatorEmail,
    dateEnd,
    dateStart,
    description,
    googleId,
    title,
    userId
}


export interface EventPutDto {
    attended,
    creatorEmail,
    dateEnd,
    dateStart,
    description,
    googleId,
    title,
    userId,
    id
}