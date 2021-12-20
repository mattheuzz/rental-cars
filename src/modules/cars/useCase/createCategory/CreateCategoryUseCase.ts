import { ICategoryDTO } from "../../interface/ICategory"
import { CategoryRepository } from "../../repositories/Category"
import { injectable, inject } from "tsyringe"
import { AppError } from "../../../../errors/error"

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject(CategoryRepository)
        private categoryRepository: CategoryRepository
    ) { }

    async execute({ name, description }: ICategoryDTO): Promise<void> {
        const categoryAllreadyExists = await this.categoryRepository.findByName(name)
        if (categoryAllreadyExists) {
            throw new AppError('Category already exists', 400)
        }

        await this.categoryRepository.create({ name, description })
    }
}

export { CreateCategoryUseCase }
