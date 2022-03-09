import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionUseCase } from "./DevolutionUseCase";


export class DevolutionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    const { id: user_id } = req.user

    const devolutionUseCase = container.resolve(DevolutionUseCase)

    const rental = await devolutionUseCase.execute({ id, user_id })

    return res.status(201).json(rental)
  }
}
