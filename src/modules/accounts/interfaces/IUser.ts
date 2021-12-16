export interface ICreateUserDto{
  name: string
  username: string
  password: string
  email: string
  driver_license: string
}

export interface IUserRepository {
  create({ name, username, password, email, driver_license }: ICreateUserDto): Promise<void>
  
  
}