import { inject, injectable } from "tsyringe"
import { ICreationSpecificationDTO } from "../../interface/ISpecification"
import { SpecificationRepository } from "../../repositories/Specification"

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: SpecificationRepository
  ){}

  execute({ name, description }: ICreationSpecificationDTO): void{
    const specificationAllredyExists = this.specificationRepository.findByName(name)
    if(specificationAllredyExists){
      throw new Error('Specification already exists')
    }
    
    this.specificationRepository.create({ 
      name, 
      description 
    })

  }
}

export { CreateSpecificationUseCase }
