import { AppError } from "@errors/error";
import { ICarsRepository } from "@modules/cars/interface/ICars";
import { CarsRepository } from "@modules/cars/repositories/CarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/interface/IRentalRepository";
import { RentalRepository } from "@modules/rentals/repositories/RentalRepository";
import { DayJsDateProvider } from "@shared/container/providers/Date/implementations/DayJsDateProvider";
import { inject, injectable } from "tsyringe";

export interface IRequestDevolution {
  id: string
  user_id: string
}

@injectable()
export class DevolutionUseCase {
  constructor(
    @inject(RentalRepository)
    private rentalsRepository: IRentalRepository,
    @inject(DayJsDateProvider)
    private dayjsDateProvider: DayJsDateProvider,
    @inject(CarsRepository)
    private carsRepository: ICarsRepository
  ){}
  async execute({ id, user_id }: IRequestDevolution): Promise<Rental> {

    const minimunDaily = 1

    const rental = await this.rentalsRepository.findById(id)

    if (!rental) {
      throw new AppError('Rental not found', 404)
    }

    const car = await this.carsRepository.findById(rental.car_id)

    if (rental.user_id !== user_id) {
      throw new AppError('User not authorized', 401)
    }

    const dateNow = this.dayjsDateProvider.dateNow()

    let daily = this.dayjsDateProvider.compareDates(rental.start_date, dateNow)

    if (daily <= minimunDaily) {
      daily = minimunDaily
    }

    const delay = this.dayjsDateProvider.compareDays(dateNow, rental.expected_return_date)

    let total = 0

    if (delay > 0) {
      const finalValue = delay * car!.fine_amount
      total = finalValue
    }

    total += daily * car!.daily_rate

    rental.end_date = dateNow 
    rental.total = total

    await this.rentalsRepository.create(rental)

    await this.carsRepository.updateAvaliable(car!.id as string, true)

    return rental

  }
}
