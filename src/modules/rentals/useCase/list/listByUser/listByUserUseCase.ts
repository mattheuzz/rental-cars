import { AppError } from "@errors/error";
import { IUserRepository } from "@modules/accounts/interfaces/IUser";
import { UsersRepositorys } from "@modules/accounts/repositories/Users";
import { ICarsRepository } from "@modules/cars/interface/ICars";
import { CarsRepository } from "@modules/cars/repositories/CarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository, IRequestDevolution } from "@modules/rentals/interface/IRentalRepository";
import { RentalRepository } from "@modules/rentals/repositories/RentalRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class ListByUserUseCase {
  constructor(
    @inject(RentalRepository)
    private rentalRepository: IRentalRepository,
    @inject(UsersRepositorys)
    private userRepository: IUserRepository
  ){}
  async execute(user_id: string ): Promise<Rental[]> {

    const rental = await this.rentalRepository.findByUserId(user_id)

    if (!rental){
      throw new AppError('This user has no rentals', 200)
    }

    return rental
  }
}
