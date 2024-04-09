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
// public string? FullName { get; set; }
// public string? title { get; set; }

// public string? image { get; set; }

// public string? Password { get; set; }

// public string? email { get; set; }

// public int? RoleID { get; set; }

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
  [FullName: string]: string | null | number;
  email: string | null;
  image: string | null;
  Password: string | null;
  title: string | null;
  phoneNumber: string | null;

  RoleID: number | null;
};
