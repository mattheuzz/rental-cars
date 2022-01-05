import { Car } from "../infra/typeorm/entities/Cars";

export interface ICarsRequest {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

export interface ICarsRepository {
  create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
    }: ICarsRequest): Promise<Car>
    
    findByLicensePlate(license_plate: string): Promise<Car | undefined>

    
}