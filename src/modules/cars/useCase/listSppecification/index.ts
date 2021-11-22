import { SpecificationRepository } from "../../repositories/Specification";
import { ListSpecificationController } from "./ListSpecificationController";
import { ListSpecificationUsecase } from "./ListSpecificationUseCase";

const specificationRepository = SpecificationRepository.getInstance()
const specificationUseCase = new ListSpecificationUsecase(specificationRepository)
const specificationsController = new ListSpecificationController(specificationUseCase)

export { specificationsController }
