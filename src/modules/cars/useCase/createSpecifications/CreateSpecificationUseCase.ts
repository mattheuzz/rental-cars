import { inject, injectable } from "tsyringe"
import { ICreationSpecificationDTO } from "../../interface/ISpecification"
import { SpecificationRepository } from "../../repositories/Specification"

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: SpecificationRepository
  ){}

  async execute({ name, description }: ICreationSpecificationDTO): Promise<void> {
    const specificationAllredyExists = await this.specificationRepository.findByName(name)
    if(specificationAllredyExists){
      throw new Error('Specification already exists')
    }
    
    await this.specificationRepository.create({ 
      name, 
      description 
    })

  }
}

export { CreateSpecificationUseCase }
