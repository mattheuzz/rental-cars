import { inject, injectable } from "tsyringe"
import { ICreateUserDto } from "../../interfaces/IUser"
import { IUserRepository } from "../../interfaces/IUser"
import { UsersRepositorys } from "../../repositories/Users"
import { hash } from "bcrypt"

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
      throw new Error("User already exist")
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