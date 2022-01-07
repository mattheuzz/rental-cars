import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./ListCarsUseCase";

export class ListCarsController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { name, category_id, brand } = req.query

    const listCarsUsecase = container.resolve(ListCarsUseCase)

    const cars = await listCarsUsecase.execute({
      name: name as string,
      category_id: category_id as string,
      brand: brand as string
    })

    return res.status(200).json(cars)
  }
}