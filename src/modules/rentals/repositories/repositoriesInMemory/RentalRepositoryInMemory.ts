import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalRepository } from "@modules/rentals/interface/IRentalRepository";


class RentalRepositoryInMemory implements IRentalRepository {
  rental : Rental[] = []
  async findOpenRentalByCarId(car_id: string): Promise<Rental | undefined> {
    return this.rental.find(rental=> rental.car_id === car_id && rental.end_date === null)
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental | undefined> {
    return this.rental.find(rental=> rental.user_id === user_id && rental.end_date === null)
  }

}

export { RentalRepositoryInMemory }
