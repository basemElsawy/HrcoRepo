interface UserLogin {}

export interface Roles {
  id: number;
  description: string;
}

export interface Routes {
  id: number;
  route: string;
  routeName: string;
  icon: string;
}
export interface Role {
  Id: number;
  Description: string;
}

export interface Users {
  Id: string;
  email: string;
  password: string;
  image?: string;
  title: string;
  fullName: string;
  EmployeeCode: string;
  RoleID: number;
  Role: Role;
}

export interface UsersPage {
  TotalCount: number;
  data: Users[];
  PageSize: number;
  PageCount: number;
}
export interface GContextModel {
  roles: Roles[];
}

export type Inputs = {
  fullName: string;
  email: string;
  password: string;
  title: string;
};
