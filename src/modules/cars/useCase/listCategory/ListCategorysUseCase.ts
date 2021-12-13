import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { CategoryRepository } from "../../repositories/Category";

injectable()
class ListCategorysUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: CategoryRepository
    ) {}
    async execute(): Promise<Category[]> {
      const categorys = await this.categoryRepository.list()
      return categorys
  } 
}
export { ListCategorysUseCase }
