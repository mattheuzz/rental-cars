import { AppError } from "@errors/error"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalRepository } from "@modules/rentals/interface/IRentalRepository"

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date

}

export class CreateRentalUseCase{
  constructor (private retalsRepository: IRentalRepository){}
  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

    const carUnavailable = await this.retalsRepository.findOpenRentalByCarId(car_id)
    if (carUnavailable) {
      throw new AppError('Car already rented')
    }

    const userAlreadyHasRental = await this.retalsRepository.findOpenRentalByUserId(user_id)
    if (userAlreadyHasRental) {
      throw new AppError('User already has a rental')
    }

    const rental = await this.retalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    return rental
  }
}
