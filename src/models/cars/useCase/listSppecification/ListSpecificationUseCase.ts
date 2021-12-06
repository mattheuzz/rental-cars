import { Specification } from "../../entities/Specification";
import { SpecificationRepository } from "../../repositories/Specification";

class ListSpecificationUsecase{
  constructor(private specificationRepository: SpecificationRepository){}
  
  execute(): Specification[]{
    const all = this.specificationRepository.list()
    return all
  }
}

export { ListSpecificationUsecase }
