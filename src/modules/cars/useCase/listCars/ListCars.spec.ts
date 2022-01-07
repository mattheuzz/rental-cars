import { CarsRepository } from "@modules/cars/repositories/CarsRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsInMemory"
import { ListCarsUseCase } from "./ListCarsUseCase"


let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory as unknown as CarsRepository)
  })

  it("Should be able to list all avaliable cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: '1'
    })
    const cars = await listCarsUseCase.execute({})
    expect(cars).toEqual([car])
  })
  it("Should be able to list all avaliable cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: '1'
    })
    const cars = await listCarsUseCase.execute({
      name: 'Name Car'
    })
    console.log(car, cars)
    expect(cars).toEqual([car])
  })
  it("Should be able to list all avaliable cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: '1'
    })
    const cars = await listCarsUseCase.execute({
      brand: 'Fiat'
    })
    console.log(car, cars)
    expect(cars).toEqual([car])
  })
  it("Should be able to list all avaliable cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 10,
      brand: 'Fiat',
      category_id: '1'
    })
    const cars = await listCarsUseCase.execute({
      category_id: '1'
    })
    console.log(car, cars)
    expect(cars).toEqual([car])
  })
})
