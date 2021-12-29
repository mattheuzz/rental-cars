import { inject, injectable } from "tsyringe"
import { Category } from "@modules/cars/infra/typeorm/entities/Category"
import { ICategoryRepository } from "@modules/cars/interface/ICategory"
import { CategoryRepository } from "@modules/cars/repositories/Category"

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
