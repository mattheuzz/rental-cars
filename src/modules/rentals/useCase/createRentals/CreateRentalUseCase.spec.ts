
import { AppError } from "@errors/error";
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
    const rental = await createRentalUseCase.execute({
      user_id: '121212',
      car_id: '131313',
      expected_return_date: new Date()
    });

    console.log(rental)

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('Should not be able to create a new rental if thers another open rental for the same user_id', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '121212',
        car_id: '131313',
        expected_return_date: new Date()
      });
  
      const rental = await createRentalUseCase.execute({
        user_id: '121212',
        car_id: '131313',
        expected_return_date: new Date()
      });
  
      console.log(rental)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new rental if thers another open rental for the same car_id', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '121212',
        car_id: '131313',
        expected_return_date: new Date()
      });
  
      const rental = await createRentalUseCase.execute({
        user_id: '222222',
        car_id: '131313',
        expected_return_date: new Date()
      });
  
      console.log(rental)
    }).rejects.toBeInstanceOf(AppError)
  })
})
