import { CarImage } from "../infra/typeorm/entities/CarsImage";

export interface ICarImageRepository {
  create(car_id: string, image_name: string): Promise<CarImage>
}

export interface ICarImageRequest {
  car_id: string
  image_name: string[]
}
