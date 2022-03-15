import { ForgottenPassowrdController } from "@modules/accounts/useCases/forgottenpassword/ForgottenPassowordController"
import { Router } from "express"

const forgottenRoutes = Router()
const forgottenPasswordController = new ForgottenPassowrdController()

forgottenRoutes.post('/forgotten', forgottenPasswordController.handle)

export { forgottenRoutes }
