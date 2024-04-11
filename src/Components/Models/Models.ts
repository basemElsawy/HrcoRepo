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
  id: string;
  email: string;
  password: string;
  image?: string;
  title: string;
  fullName: string;
  employeeCode: string;
  RoleID: number;
  phoneNumber: string;
  Role: Role;
}
export interface UsersPatch {
  email?: string;
  Password?: string;
  image?: string;
  title?: string;
  FullName?: string;
  RoleID?: number;
}

export interface UsersPage {
  totalCount?: number;
  data?: Users[];
  pageSize?: number;
  pageCount?: number;
}
export interface GContextModel {
  roles: Roles[];
}

export type Inputs = {
  [FullName: string]: string | null | number;
  email: string | null;
  image: string | null;
  Password: string | null;
  title: string | null;
  phoneNumber: string | null;
  EmployeeCode: string | null | number;
  RoleID: number | null;
};

export interface PropsForUpdateForm {
  isNewEmployee: boolean;
  user: Users | null;
  updateUserFunc(nullifiedData: Inputs): void;
  addNewMember(newUserData: Inputs): void;
}

export interface GlobalContextData {
  roles: Roles[];
}
