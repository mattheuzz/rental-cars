import { getRepository, Repository } from "typeorm";
import { CarImage } from "../infra/typeorm/entities/CarsImage";
import { ICarImageRepository } from "../interface/ICarImage";


export class CarImagesRepository implements ICarImageRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }
  async create (
    car_id: string,
    image_name: string
  ): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name
    })

    await this.repository.save(carImage)

    return carImage
  }
}