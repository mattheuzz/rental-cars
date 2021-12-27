import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { CreateCategoryInMemory } from "../../repositories/in-memory/CategorysInMemory"
import { CategoryRepository } from "../../repositories/Category"
import { AppError } from "../../../../errors/error"

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
    expect(async () => {
      const category = {
        name: "test", 
        description: "test" 
        }
      
      await createCategory.execute({
        name: category.name,
        description: category.description
      })
  
      await createCategory.execute({
        name: category.name,
        description: category.description
      })
    }).rejects.toBeInstanceOf(AppError)

  })
}) 