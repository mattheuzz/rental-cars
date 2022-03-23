import * as dotenv from "dotenv"
import { container } from "tsyringe"

import { LocalStorageProvider } from "./implementations/localStorage"
import { S3Storage } from "./implementations/S3Storage"
import { IStorageProvider } from "./IStorage"

dotenv.config()

const diskSotrage = {
  local: LocalStorageProvider,
  S3: S3Storage
}

container.registerSingleton<IStorageProvider>(
  "LocalStorageProvider",
  diskSotrage[process.env.disk]
)