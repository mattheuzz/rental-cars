import * as dotenv from "dotenv"

import { container } from "tsyringe";
import { IEmail } from "./IEmail";
import { EtheralEmail } from "./Implementations/EtherealEmail";
import { SESEmail } from "./Implementations/SesEmail";

dotenv.config()

const mailprovider = {
  etheral: container.resolve(EtheralEmail),
  ses: container.resolve(SESEmail)
}

container.registerInstance<IEmail>(
  "Email",
  mailprovider[process.env.EMAIL_PROVIDER]
)
