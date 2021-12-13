import { Request, Response } from 'express'
import { ListCategorysUseCase } from './ListCategorysUseCase'
import { container } from 'tsyringe'

class ListCategorysController{

  async handle(req: Request, res: Response): Promise<Response>{
    const listCategoryUseCase = container.resolve(ListCategorysUseCase)

    const allCategorys = await listCategoryUseCase.execute()

    return res.json(allCategorys)
  }
}

export { ListCategorysController }
