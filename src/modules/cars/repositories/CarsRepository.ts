import { getRepository, Repository } from "typeorm";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository, ICarsRequest } from "../interface/ICars";


export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICarsRequest): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    await this.repository.save(car)
    
    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.repository.findOne({license_plate})
    return car
  }
}