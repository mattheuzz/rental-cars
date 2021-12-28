import { Category } from "@modules/cars/entities/Category"

interface ICategoryDTO {
    name: string
    description: string
}

interface ICategoryRepository {
    findByName(name: string): Promise<Category>
    list(): Promise<Category[]>
    create({ name, description }: ICategoryDTO): Promise<void>
}

export { ICategoryDTO, ICategoryRepository }
