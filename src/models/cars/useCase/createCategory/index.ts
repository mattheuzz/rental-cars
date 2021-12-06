import { CategoryRepository } from "../../repositories/Category";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default ((): CreateCategoryController => {
    const categoryRepository = new CategoryRepository()

    const createCategoryUsecase = new CreateCategoryUseCase(categoryRepository)

    const createCategoryController = new CreateCategoryController(createCategoryUsecase)

    return createCategoryController
})