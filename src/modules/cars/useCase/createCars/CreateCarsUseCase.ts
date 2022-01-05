import { AppError } from "@errors/error"
import { Car } from "@modules/cars/infra/typeorm/entities/Cars"
import { CarsRepository } from "@modules/cars/repositories/CarsRepository"
import { inject, injectable } from "tsyringe"
import { ICarsRepository, ICarsRequest } from "../../interface/ICars"


@injectable()
class CreateCarUseCase {
  constructor(
    @inject(CarsRepository)
    private carsRepository: CarsRepository
  ) { }

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICarsRequest): Promise<Car> {
    
    const carsAlredyExists = await this.carsRepository.findByLicensePlate(license_plate)

    if (carsAlredyExists) {
      throw new AppError("Car already exists")
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })
    return car
  }
}

export { CreateCarUseCase }
