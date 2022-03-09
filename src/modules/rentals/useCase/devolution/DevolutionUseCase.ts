import { ICarsRepository } from "@modules/cars/interface/ICars";
import { IRentalRepository } from "@modules/rentals/interface/IRentalRepository";
import { DayJsDateProvider } from "@shared/container/providers/Date/implementations/DayJsDateProvider";

export class DevolutionUseCase {
  constructor(
    private rentalsRepository: IRentalRepository,
    private carsRepository: ICarsRepository,
    private dayjsDateProvider: DayJsDateProvider
  ) {}
  async execute(rental_id: string): Promise<void> {
    const rental = await this.rentalsRepository.findById(rental_id)
  }
}
