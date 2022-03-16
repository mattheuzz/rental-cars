import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPassowrdUseCase } from "./ResetPassowrdUseCase";


export class ResetPassowrdController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { token } = req.query as { token: string }
    const { password } = req.body

    const resetPassowrdUseCase = container.resolve(ResetPassowrdUseCase)

    resetPassowrdUseCase.execute({ token, password })

    return res.send()
  }
}

