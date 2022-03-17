import { Request, Response } from "express";
import { container } from "tsyringe";
import { ForgottenPasswordUseCase } from "./ForgottenPassowordUseCase";


export class ForgottenPassowrdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body
    const forgottenPasswordUseCase = container.resolve(ForgottenPasswordUseCase)
    await forgottenPasswordUseCase.execute(email)
    return res.json({ message: 'ok' })
  }
}
