import { getRepository, Repository } from "typeorm";
import { Users } from "../entities/Users";
import { ICreateUserDto, IUserRepository } from "../interfaces/IUser";

export class UsersRepositorys implements IUserRepository {
  private repository: Repository<Users>

  constructor(){
    this.repository = getRepository(Users)
  }

  async create({ name, username, password, email, driver_license }: ICreateUserDto): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      password,
      email,
      driver_license
    })

    await this.repository.save(user)
    console.log(user)
  }
}

