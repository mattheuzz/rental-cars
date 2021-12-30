import { container } from "tsyringe"
import { SpecificationRepository } from "@modules/cars/repositories/Specification"
import { CategoryRepository } from "../../modules/cars/repositories/Category"
import { ICategoryRepository } from "../../modules/cars/interface/ICategory"
import { ISpecificationsRepository } from "../../modules/cars/interface/ISpecification"
import { IUserRepository } from "../../modules/accounts/interfaces/IUser"
import { UsersRepositorys } from "../../modules/accounts/repositories/Users"

container.registerSingleton<ICategoryRepository>(
    "CategoryRepository",
    CategoryRepository,
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationRepository",
    SpecificationRepository,
)

container.registerSingleton<IUserRepository>(
    "UserRepositorys",
    UsersRepositorys
)