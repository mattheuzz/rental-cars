import * as dotenv from "dotenv"

import { container } from "tsyringe"
import { IDateProvider } from "./Date/IDateProvider"
import { DayJsDateProvider } from "./Date/implementations/DayJsDateProvider"
import { IEmail } from "./Email/IEmail"
import { EtheralEmail } from "./Email/Implementations/EtherealEmail"
import { LocalStorageProvider } from "./Storage/implementations/localStorage"
import { S3Storage } from "./Storage/implementations/S3Storage"
import { IStorageProvider } from "./Storage/IStorage"

dotenv.config()

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
)

container.registerInstance<IEmail>(
  "EthereaEmail",
  new EtheralEmail()
)

const diskSotrage = {
  local: LocalStorageProvider,
  S3: S3Storage
}

container.registerSingleton<IStorageProvider>(
  "LocalStorageProvider",
  diskSotrage[process.env.disk]
)

