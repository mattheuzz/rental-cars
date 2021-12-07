import { ICategoryDTO } from "../../interface/ICategory";
import { CategoryRepository } from "../../repositories/Category"



class CreateCategoryUseCase {
    constructor (private categoryRepository: CategoryRepository) {}

    async execute({ name, description }: ICategoryDTO ): Promise<void>{
        const categoryAllreadyExists = await this.categoryRepository.findByName(name)
        if (categoryAllreadyExists) {
            throw new Error('Category already exists')
        }

        this.categoryRepository.create({ name, description })
    }
}

export { CreateCategoryUseCase }
