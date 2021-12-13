import { container } from "tsyringe"
import { SpecificationRepository } from "../../modules/cars/repositories/Specification"
import { CategoryRepository } from "../../modules/cars/repositories/Category"
import { ICategoryRepository } from "../../modules/cars/interface/ICategory"
import { ISpecificationsRepository } from "../../modules/cars/interface/ISpecification"

container.registerSingleton<ICategoryRepository>(
    "CategoryRepository",
    CategoryRepository,
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationRepository",
    SpecificationRepository,
)