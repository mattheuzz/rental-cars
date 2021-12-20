export interface IRequest {
  email: string
  password: string
}

export interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string
}