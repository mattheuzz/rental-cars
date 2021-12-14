import { ICreationSpecificationDTO, ISpecificationsRepository } from "../interface/ISpecification"
import { Specification } from "../entities/Specification"
import { getRepository, Repository } from "typeorm"

class SpecificationRepository implements ISpecificationsRepository{
  private repository: Repository<Specification>

  private constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ name, description }: ICreationSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description
    })
    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({
      name
    })
    return specification
  }
}

export { SpecificationRepository }
