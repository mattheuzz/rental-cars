import { CategoryRepository } from "../../repositories/Category"
import { ListCategorysController } from "./ListCategorysController"
import { ListCategorysUseCase } from "./ListCategorysUseCase"

const categoryRepository = CategoryRepository.getInstance()

const listCategoryUseCase = new ListCategorysUseCase(categoryRepository)

const listCategoryUseCaseController = new ListCategorysController(listCategoryUseCase)

export { listCategoryUseCaseController}
