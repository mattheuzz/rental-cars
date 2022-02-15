import { container } from "tsyringe"
import { IDateProvider } from "./Date/IDateProvider"
import { DayJsDateProvider } from "./Date/implementations/DayJsDateProvider"

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
)
