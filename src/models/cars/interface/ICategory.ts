import { Category } from "../entities/Category";

interface ICategoryDTO {
    name: string
    description: string
}

interface ICategoryRepository {
    findByName(name: string): Category | undefined
    list(): Category[]
    create({ name, description }: ICategoryDTO): void
}

export { ICategoryDTO, ICategoryRepository }
