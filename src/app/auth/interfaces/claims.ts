import { map } from "rxjs"
import { Role } from "./role"

export interface Claims {
    CreatedAt?: string,
    DeletedAt?: string,
    ID?: number,
    Roles?: Role[],
    UpdatedAt?: string
    exp?: number
    iat?: number
    iss?: number
    user_name?: string
}