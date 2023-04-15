export enum Roles {
    ADMINISTRATOR,
    USER,
    TESTER,
    CLIENT
}

export interface Role {
    ID?: number,
    name?: string
}