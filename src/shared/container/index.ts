import { container } from "tsyringe"
import "./providers/index"
import { SpecificationRepository } from "@modules/cars/repositories/Specification"
import { CategoryRepository } from "../../modules/cars/repositories/Category"
import { ICategoryRepository } from "../../modules/cars/interface/ICategory"
import { ISpecificationsRepository } from "../../modules/cars/interface/ISpecification"
import { ICarImageRepository } from "../../modules/cars/interface/ICarImage"
import { IUserRepository } from "../../modules/accounts/interfaces/IUser"
import { UsersRepositorys } from "../../modules/accounts/repositories/Users"
import { ICarsRepository } from "@modules/cars/interface/ICars"
import { CarsRepository } from "@modules/cars/repositories/CarsRepository"
import { CarImagesRepository } from "@modules/cars/repositories/CarsImageReository"
import { IRentalRepository } from "@modules/rentals/interface/IRentalRepository"
import { RentalRepository } from "@modules/rentals/repositories/RentalRepository"

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

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarImageRepository>(
    "CarImagesRepository",
    CarImagesRepository
)

container.registerSingleton<IRentalRepository>(
    "RentalRepository",
    RentalRepository
)
