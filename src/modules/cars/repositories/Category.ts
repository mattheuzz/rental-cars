import { ICategoryDTO, ICategoryRepository } from "../interface/ICategory";
import { Category } from "../model/Category";

class CategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }
  create({ name, description }: ICategoryDTO): void {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });
    this.categories.push(category);
  }
  list(): Category[] {
    return this.categories;
  }
  findByName(name: string): Category | undefined {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoryRepository };
