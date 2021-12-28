import { Users } from "@modules/accounts/entities/Users";
import { ICreateUserDto, IUserRepository } from "@modules/accounts/interfaces/IUser";

class UserRepositoryInMemory implements IUserRepository {
  users: Users[] = []

  async create({ name, password, email, driver_license }: ICreateUserDto): Promise<void> {
    const user = new Users()

    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
    })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<Users> {
    const user = this.users.find(user => user.email === email)

    return user as Users
  }

  async findById(id: string): Promise<Users> {
    const user = this.users.find(user => user.id === id)
    return user as Users
  }

}

export { UserRepositoryInMemory }