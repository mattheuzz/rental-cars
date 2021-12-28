import { ICategoryDTO, ICategoryRepository } from "@modules/cars/interface/ICategory"
import { Category } from "@modules/cars/entities/Category"
import { Repository, getRepository } from "typeorm"


class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }
  
  async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    })
    await this.repository.save(category)
    console.log(category)
    
  }
  async list(): Promise<Category[]>{
     const categories = await this.repository.find()
     return categories
  }
  async findByName(name: string): Promise<Category>{
    const category = await this.repository.findOne({
      name
    })
    return category as Category 
  }
}

export { CategoryRepository }
