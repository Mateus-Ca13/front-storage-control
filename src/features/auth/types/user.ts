export interface iUser {
    id: number
    name: string
    username: string
    email: string
    password: string
    role: UserRoleType
    createdAt: Date
}

export const UserRoleTuple = ["USER", "ADMIN", "SUPER_ADMIN"] as const;
export type UserRoleType = (typeof UserRoleTuple)[number];