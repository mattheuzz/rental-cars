import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { CreateCategoryInMemory } from "@modules/cars/repositories/in-memory/CategorysInMemory"
import { CategoryRepository } from "@modules/cars/repositories/Category"
import { AppError } from "@errors/error"

let createCategory: CreateCategoryUseCase
let createCategoryInMemory: CreateCategoryInMemory

describe("Create Category", () => {
  beforeEach(() => {
    createCategoryInMemory = new CreateCategoryInMemory()
    createCategory = new CreateCategoryUseCase(createCategoryInMemory as unknown as CategoryRepository)
  })

  it ("should be able to create a new category", async() => {
    const category = {
      name: "test", 
      description: "test" 
      }
    
    await createCategory.execute({
      name: category.name,
      description: category.description
    })

    const result = await createCategoryInMemory.findByName(category.name)

    console.log(result)

    expect(result).toHaveProperty("id")
  })

  it ("should not be able to create a new category with the same name", async() => {
    const category = {
      name: "test", 
      description: "test" 
      }
    
    await createCategory.execute({
      name: category.name,
      description: category.description
    })
    await expect(createCategory.execute({
        name: category.name,
        description: category.description
      })
    ).rejects.toEqual(new AppError("Category already exists", 400))

  })
}) 