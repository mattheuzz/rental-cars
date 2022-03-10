import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListByUserUseCase } from "./listByUserUseCase";


export class ListByUserController {
  async handle (req: Request, res: Response): Promise<Response>{

    const { id } = req.user

    const listByUserUseCase = container.resolve(ListByUserUseCase)
    const rental = await listByUserUseCase.execute(id)

    return res.status(200).json(rental)
  }
}
