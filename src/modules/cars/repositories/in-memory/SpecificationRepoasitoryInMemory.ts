import { Specification } from "@modules/cars/infra/typeorm/entities/Specification"
import { ICreationSpecificationDTO, ISpecificationsRepository } from "@modules/cars/interface/ISpecification"


export class SpecificationRepoasitoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = []
  async create({ name, description }: ICreationSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description
    })

    this.specifications.push(specification)
    return specification
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(specification => specification.name === name)

    return specification as unknown as Specification
  }

  async findById(ids: string[]): Promise<Specification[]>{
    const allSpecification = this.specifications.filter(specification => ids.includes(specification.id as string))

    return allSpecification
  }
}