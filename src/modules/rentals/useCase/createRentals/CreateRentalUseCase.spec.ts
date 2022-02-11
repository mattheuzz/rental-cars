
import { RentalRepositoryInMemory } from "../../repositories/repositoriesInMemory/RentalRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase
let rentalRepositoryInMemory: RentalRepositoryInMemory

describe('Create Rental', () =>{
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
  })

  it('Should be able to create a new rental', async () => {
    createRentalUseCase.execute({
      user_id: '121212',
      car_id: '131313',
      expected_return_date: new Date()
    });
  })

})
