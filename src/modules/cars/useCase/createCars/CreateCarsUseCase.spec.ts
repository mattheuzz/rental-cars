import { AppError } from "@errors/error"
import { ICarsRepository } from "@modules/cars/interface/ICars"
import { CarsRepository } from "@modules/cars/repositories/CarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsInMemory"
import { CreateCarUseCase } from "./CreateCarsUseCase"


let createCarUseCase: CreateCarUseCase
let carsRepository: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepository as unknown as CarsRepository)
  })

  it ('Should be able to create a new car', async () => {
    await createCarUseCase.execute({
    name: 'Name Car',
    description: 'Description Car',
    daily_rate: 100,
    license_plate: 'ABC-1234',
    fine_amount: 10,
    brand: 'Fiat',
    category_id: '1'
    })
  })

  it ('Should not be able to create a new car with a same licence plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car',
        description: 'Description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 10,
        brand: 'Fiat',
        category_id: '1'
      })

      await createCarUseCase.execute({
        name: 'Car2',
        description: 'Description2',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 10,
        brand: 'Fiat',
        category_id: '1'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  it ('The car created must be avaliable and have an id', async () => {
    const result = await createCarUseCase.execute({
    name: 'Name Car',
    description: 'Description Car',
    daily_rate: 100,
    license_plate: 'ABC-1234',
    fine_amount: 10,
    brand: 'Fiat',
    category_id: '1'
    })
    expect(result.avaiable).toBe(true)
    expect(result.id).toBeTruthy()
  })
})
