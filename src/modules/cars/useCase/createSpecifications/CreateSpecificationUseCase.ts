import { inject, injectable } from "tsyringe"
import { AppError } from "@errors/error"
import { ICreationSpecificationDTO } from "@modules/cars/interface/ISpecification"
import { SpecificationRepository } from "@modules/cars/repositories/Specification"

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: SpecificationRepository
  ){}

  async execute({ name, description }: ICreationSpecificationDTO): Promise<void> {
    const specificationAllredyExists = await this.specificationRepository.findByName(name)
    if(specificationAllredyExists){
      throw new AppError('Specification already exists', 400)
    }
    
    await this.specificationRepository.create({ 
      name, 
      description 
    })

  }
}

export { CreateSpecificationUseCase }
