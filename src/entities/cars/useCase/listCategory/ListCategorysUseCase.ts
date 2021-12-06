import { Category } from "../../model/Category";
import { CategoryRepository } from "../../repositories/Category"

class ListCategorysUseCase {
  constructor(private categoryRepository: CategoryRepository) {}
  execute(): Category [] {
    const all = this. categoryRepository.list()
    return all
}
}
export { ListCategorysUseCase }
