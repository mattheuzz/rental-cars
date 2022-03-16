import { ForgottenPassowrdController } from "@modules/accounts/useCases/forgottenpassword/ForgottenPassowordController"
import { ResetPassowrdController } from "@modules/accounts/useCases/resetPassowrd/ResetPassowrdController"
import { Router } from "express"

const forgottenRoutes = Router()
const forgottenPasswordController = new ForgottenPassowrdController()
const resetPassowrdController = new ResetPassowrdController()

forgottenRoutes.post('/forgotten', forgottenPasswordController.handle)
forgottenRoutes.post('/reset', resetPassowrdController.handle)

export { forgottenRoutes }
