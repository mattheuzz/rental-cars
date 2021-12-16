import { inject, injectable } from "tsyringe";
import { ICreateUserDto } from "../../interfaces/IUser";
import { IUserRepository } from "../../interfaces/IUser";
import { UsersRepositorys } from "../../repositories/Users";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject(UsersRepositorys)
    private usersRepository: IUserRepository
  ) {

  } 
  async execute({ name, username, password, email, driver_license }: ICreateUserDto): Promise<void> {
    
    await this.usersRepository.create({
      name,
      username,
      password,
      email,
      driver_license,
    })
  }
}

export{ CreateUserUseCase }