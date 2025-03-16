export interface CreateUserParams {
  fullname: string;
  email: string;
  password: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}