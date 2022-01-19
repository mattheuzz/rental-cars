import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
interface ICreationSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  
  create({ name, description }: ICreationSpecificationDTO): Promise<Specification>
  findByName(name: string): Promise<Specification>
  findById(ids: string[]): Promise<Specification[]>
}

export { ISpecificationsRepository, ICreationSpecificationDTO }
