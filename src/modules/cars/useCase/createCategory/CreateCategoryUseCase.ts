import { ICategoryDTO } from "../../interface/ICategory"
import { CategoryRepository } from "../../repositories/Category"
import { injectable, inject } from "tsyringe"

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject(CategoryRepository)
        private categoryRepository: CategoryRepository
    ) { }

    async execute({ name, description }: ICategoryDTO): Promise<void> {
        const categoryAllreadyExists = await this.categoryRepository.findByName(name)
        if (categoryAllreadyExists) {
            throw new Error('Category already exists')
        }

        await this.categoryRepository.create({ name, description })
    }
}

export { CreateCategoryUseCase }
