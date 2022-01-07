import { Car } from "@modules/cars/infra/typeorm/entities/Cars"
import { ICarsRepository, ICarsRequest, IListCars } from "@modules/cars/interface/ICars"

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICarsRequest): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.cars.find(car => car.license_plate === license_plate)

    return car
  }

  async findAvaliable({ name, brand, category_id }: IListCars): Promise<Car[] | undefined> {
    const all = this.cars
      .filter(car => {
        if (car.avaiable === true || ((name && car.name === name) || (brand && car.brand === brand) || (category_id && car.category_id === category_id))) {
          return car
        }
        return null
      })
    return all
  }
}
