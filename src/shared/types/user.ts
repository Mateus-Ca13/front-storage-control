export interface iUser {
    id: number
    name: string
    username: string
    email: string
    role: UserRoleType
    createdAt: Date

}

export const UserRoleTuple = ["ADMIN" , "USER" , "SUPER_ADMIN"] as const; 
export type UserRoleType = (typeof UserRoleTuple)[number];

export type iUserColumnConfig = Omit<iUser, "createdAt"> & {actions: null}