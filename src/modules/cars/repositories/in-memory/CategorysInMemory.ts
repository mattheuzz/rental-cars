import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoryDTO, ICategoryRepository } from "@modules/cars/interface/ICategory";

class CreateCategoryInMemory implements ICategoryRepository {
  categories: Category[] = []

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name)
    return category as Category
  }
  async list(): Promise<Category[]> {
    const list_categories = this.categories
    return list_categories
  }
  async create({ name, description }:ICategoryDTO): Promise<void> {
    const category = new Category()
    Object.assign(category, { 
      name, 
      description 
    })

    this.categories.push(category)
  }

}

export { CreateCategoryInMemory }