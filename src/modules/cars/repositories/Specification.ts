import { ICreationSpecificationDTO, ISpecificationsRepository } from "@modules/cars/interface/ISpecification"
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification"
import { getRepository, Repository } from "typeorm"

class SpecificationRepository implements ISpecificationsRepository{
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: ICreationSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description
    })
    await this.repository.save(specification)
    return specification
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      name
    })
    return specification as unknown as Specification
  }
  async findById(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids)    
    return specifications
  }
}

export { SpecificationRepository }
