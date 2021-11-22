import { CategoryRepository } from "../../repositories/Category";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoryRepository = CategoryRepository.getInstance()

const createCategoryUsecase = new CreateCategoryUseCase(categoryRepository)

const createCategoryController = new CreateCategoryController(createCategoryUsecase)

export { createCategoryController }
