import { ICreationSpecificationDTO, ISpecificationsRepository } from "../interface/ISpecification"
import { Specification } from "../model/Specification"

class SpecificationRepository implements ISpecificationsRepository{
  private specifications: Specification[] = []

  constructor() {
    this.specifications = []
  }

  create({ name, description }: ICreationSpecificationDTO): void {
    const specification = new Specification

    Object.assign(specification, {
      name,
      description
    })
    
    this.specifications.push(specification)
  }

  list(): Specification[] {
    return this.specifications
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find(specification => specification.name === name)
    return specification
  }
}

export { SpecificationRepository }
