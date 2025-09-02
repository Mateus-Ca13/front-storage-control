export interface iUser {
    name: string
    username: string
    email: string
    role: UserRoleType
    createdAt: Date
}

export const UserRoleTuple = ["USER", "ADMIN", "SUPER_ADMIN"] as const;
export type UserRoleType = (typeof UserRoleTuple)[number];