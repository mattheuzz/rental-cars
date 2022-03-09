
import { AppError } from "@errors/error";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsInMemory";
import { DayJsDateProvider } from "@shared/container/providers/Date/implementations/DayJsDateProvider";
import dayjs from "dayjs";
import { RentalRepositoryInMemory } from "../../repositories/repositoriesInMemory/RentalRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase
let rentalRepositoryInMemory: RentalRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProviderInMemory: DayJsDateProvider

describe('Create Rental', () =>{
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProviderInMemory = new DayJsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dayjsDateProviderInMemory, carsRepositoryInMemory);
  })

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '121212',
      car_id: '131313',
      expected_return_date: dayAdd24Hours
    });

    console.log(rental)

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('Should not be able to create a new rental if theres another open rental for the same user_id', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '121212',
        car_id: '131313',
        expected_return_date: dayAdd24Hours
      });
  
      const rental = await createRentalUseCase.execute({
        user_id: '121212',
        car_id: '131313',
        expected_return_date: dayAdd24Hours
      });
  
      console.log(rental)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new rental if theres another open rental for the same car_id', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '121212',
        car_id: '131313',
        expected_return_date: dayAdd24Hours
      });
  
      const rental = await createRentalUseCase.execute({
        user_id: '222222',
        car_id: '131313',
        expected_return_date: dayAdd24Hours
      });
  
      console.log(rental)
    }).rejects.toBeInstanceOf(AppError)
  })
  it('Should not be able to create a new rental if expected_return_date less than 24 hours', async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: '222222',
        car_id: '131313',
        expected_return_date: new Date()
      });
  
      console.log(rental)
    }).rejects.toBeInstanceOf(AppError)
  })
})
