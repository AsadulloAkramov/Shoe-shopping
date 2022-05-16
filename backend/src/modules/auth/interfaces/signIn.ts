export interface ISignInBody {
  firstName: string,
  lastname: string,
  email: string,
  password: string,
}

export interface ISignIn {
  firstName: string,
  lastname: string,
  email: string,
  password: string,
  salt: string
}