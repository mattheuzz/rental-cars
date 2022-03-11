import { inject, injectable } from "tsyringe"
import { ICreateUserDto } from "@modules/accounts/interfaces/IUser"
import { IUserRepository } from "@modules/accounts/interfaces/IUser"
import { UsersRepositorys } from "@modules/accounts/repositories/Users"
import { hash } from "bcryptjs"
import { AppError } from "@errors/error"

@injectable()
class CreateUserUseCase {
  constructor(
    @inject(UsersRepositorys)
    private usersRepository: IUserRepository 
  ) {

  } 
  async execute({ name, password, email, driver_license }: ICreateUserDto): Promise<void> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email)
    if (userAlreadyExist) {
      throw new AppError("User already exist", 400)
    }
    const passwordHash = await hash(password, 8)
    
    await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    })
  }
}

export{ CreateUserUseCase }