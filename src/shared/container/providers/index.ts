import { container } from "tsyringe"
import { IDateProvider } from "./Date/IDateProvider"
import { DayJsDateProvider } from "./Date/implementations/DayJsDateProvider"
import { IEmail } from "./Email/IEmail"
import { EtheralEmail } from "./Email/Implementations/EtherealEmail"

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
)

container.registerSingleton<IEmail>(
  "EthereaEmail",
  EtheralEmail
)

