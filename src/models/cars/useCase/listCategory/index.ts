import { CategoryRepository } from "../../repositories/Category"
import { ListCategorysController } from "./ListCategorysController"
import { ListCategorysUseCase } from "./ListCategorysUseCase"

const categoryRepository = null

const listCategoryUseCase = new ListCategorysUseCase(categoryRepository)

const listCategoryUseCaseController = new ListCategorysController(listCategoryUseCase)

export { listCategoryUseCaseController}
