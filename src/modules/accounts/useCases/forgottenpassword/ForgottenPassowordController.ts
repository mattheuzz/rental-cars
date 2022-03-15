import { Request, Response } from "express";
import { container } from "tsyringe";
import { ForgottenPaasowrdUseCase } from "./ForgottenPassowordUseCase";


export class ForgottenPassowrdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body
    const forgottenPaasowrdUseCase = container.resolve(ForgottenPaasowrdUseCase)
    await forgottenPaasowrdUseCase.execute(email)
    return res.json({ message: 'ok' })
  }
}
