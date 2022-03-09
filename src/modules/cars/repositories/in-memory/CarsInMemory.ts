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
    category_id,
    specification
  }: ICarsRequest): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specification
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
  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find(car => car.id === id)
  }
  async updateAvaliable(id: string, avaiable: boolean): Promise<void> {
    const findIndex = this.cars.findIndex(car => car.id === id)
    this.cars[findIndex].avaiable = avaiable 
  }
}
