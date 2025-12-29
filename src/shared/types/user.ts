export interface iUser {
    id: number
    name: string
    username: string
    email: string
    role: UserRoleType
    createdAt: Date;
    updatedAt: Date;
}

export type UserAuth = Pick<iUser, "username" | "role" | "email">;

export const UserRoleTuple = [ "USER" , "ADMIN" , "SUPER_ADMIN"] as const; 
export type UserRoleType = (typeof UserRoleTuple)[number];

export type iUserColumnConfig = Omit<iUser, "createdAt"> & {actions: null}