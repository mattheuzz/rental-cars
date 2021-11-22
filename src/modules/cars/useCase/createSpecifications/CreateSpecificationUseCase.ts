import { ICreationSpecificationDTO } from "../../interface/ISpecification"
import { SpecificationRepository } from "../../repositories/Specification"

class CreateSpecificationUseCase {
  constructor(private specificationRepository: SpecificationRepository){}

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
