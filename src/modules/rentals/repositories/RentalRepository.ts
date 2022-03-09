import { getRepository, Repository } from "typeorm";
import { Rental } from "../infra/typeorm/entities/Rental";
import { ICreateRentalDTO, IRentalRepository } from "../interface/IRentalRepository";

export class RentalRepository implements IRentalRepository {
  private repoitory: Repository<Rental>

  constructor() {
    this.repoitory = getRepository(Rental)
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental | undefined> {
      const openByCar = this.repoitory.findOne({car_id})
      return openByCar
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental | undefined> {
    const openByUser = this.repoitory.findOne({user_id})
    return openByUser
  }

  async create({
    car_id,
    user_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repoitory.create({
      car_id,
      expected_return_date,
      user_id,
    })

      await this.repoitory.save(rental)
      return rental
  }
  findById(id: string): Promise<Rental | undefined> {
    const rental = this.repoitory.findOne({id})
    return rental
  }
}
