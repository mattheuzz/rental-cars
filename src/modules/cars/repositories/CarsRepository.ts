import { getRepository, Repository } from "typeorm";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository, ICarsRequest, IListCars } from "../interface/ICars"
import { Specification } from "../infra/typeorm/entities/Specification";


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
    category_id,
    specification
  }: ICarsRequest): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specification
    })

    await this.repository.save(car)
    
    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.repository.findOne({license_plate})
    return car
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = this.repository.findOne({id})
    return car
  }

  async findAvaliable ({ name, brand, category_id }: IListCars): Promise<Car[] | undefined> {
    const carsQuery = await this.repository
    .createQueryBuilder("c")
    .where("avaiable = :avaiable", {avaiable: true})

    if(brand){
      carsQuery.andWhere("c.brand = :brand", { brand })
    }
    if(name){
      carsQuery.andWhere("c.name = :name", { name })
    }
    if(category_id){
      carsQuery.andWhere("c.category_id = :category_id", { category_id })
    }

    const cars = await carsQuery.getMany()

    return cars
  }
  async updateAvaliable(id: string, avaiable: boolean): Promise<void> {
    await this.repository.createQueryBuilder()
    .update(Car)
    .set({avaiable})
    .where("id = :id")
    .setParameter("id", id)
    .execute()

  }
  
} 