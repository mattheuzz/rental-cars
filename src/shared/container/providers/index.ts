import { container } from "tsyringe"
import { IDateProvider } from "./Date/IDateProvider"
import { DayJsDateProvider } from "./Date/implementations/DayJsDateProvider"
import { IEmail } from "./Email/IEmail"
import { EtheralEmail } from "./Email/Implementations/EtherealEmail"
import { LocalStorageProvider } from "./Storage/implementations/localStorage"
import { IStorageProvider } from "./Storage/IStorage"

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
)

container.registerInstance<IEmail>(
  "EthereaEmail",
  new EtheralEmail()
)

container.registerSingleton<IStorageProvider>(
  "LocalStorageProvider",
  LocalStorageProvider
)

