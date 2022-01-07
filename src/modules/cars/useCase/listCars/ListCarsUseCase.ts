import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { IListCars } from "@modules/cars/interface/ICars";
import { CarsRepository } from "@modules/cars/repositories/CarsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListCarsUseCase {
  constructor(
    @inject(CarsRepository)
    private carsRepository: CarsRepository
  ) {}

  async execute({ name, brand, category_id }: IListCars): Promise<Car[] | undefined> {
    const cars = await this.carsRepository.findAvaliable({name, brand, category_id})
    return cars
  }
}