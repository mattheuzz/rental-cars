import { Users } from "@modules/accounts/infra/typeorm/entities/Users"

export interface ICreateUserDto{
  name: string
  password: string
  email: string
  driver_license: string
  id?: string
  avatar?: string
}

export interface IUserRepository {
  create({ name, password, email, driver_license }: ICreateUserDto): Promise<void>
  findByEmail(email: string): Promise<Users>
  findById(id: string): Promise<Users>
}