import { Specification } from '../entities/Specification'
interface ICreationSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  
  create({ name, description }: ICreationSpecificationDTO): Promise<void>
  findByName(name: string): Promise<Specification>
}

export { ISpecificationsRepository, ICreationSpecificationDTO }
