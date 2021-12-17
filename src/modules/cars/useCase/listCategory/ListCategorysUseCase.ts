import { inject, injectable } from "tsyringe"
import { Category } from "../../entities/Category"
import { ICategoryRepository } from "../../interface/ICategory"
import { CategoryRepository } from "../../repositories/Category"

@injectable()
class ListCategorysUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
    ) {}
    async execute(): Promise<Category[]> {
      const categorys = await this.categoryRepository.list()
      return categorys
  } 
}
export { ListCategorysUseCase }
