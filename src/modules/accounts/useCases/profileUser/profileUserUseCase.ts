import { AppError } from "@errors/error";
import { Users } from "@modules/accounts/infra/typeorm/entities/Users";
import { IUserResponseDTO } from "@modules/accounts/interfaces/IUser";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { UsersRepositorys } from "@modules/accounts/repositories/Users";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProfileUserUseCase {
  constructor (
    @inject("UserRepositorys")
    private userRepositorys: UsersRepositorys
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepositorys.findById(id)
    
    if(!user) {
      throw new AppError('User not found', 404)
    }

    return UserMap.toDTO(user)
  }
}
