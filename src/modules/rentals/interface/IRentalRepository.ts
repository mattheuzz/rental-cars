import { Rental } from "../infra/typeorm/entities/Rental";

export interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export interface IRentalRepository {
  findOpenRentalByCarId(car_id: string): Promise<Rental | undefined>
  findOpenRentalByUserId(user_id: string): Promise<Rental | undefined>
  create(rental: ICreateRentalDTO): Promise<Rental>
}
