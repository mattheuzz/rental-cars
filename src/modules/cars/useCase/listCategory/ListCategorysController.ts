import { Request, Response } from 'express'
import { ListCategorysUseCase } from './ListCategorysUseCase'

class ListCategorysController{
  constructor(private listCategoryUseCase: ListCategorysUseCase){}
  handle(req: Request, res: Response): Response{
    const allCategorys = this.listCategoryUseCase.execute()

    return res.json(allCategorys)
  }
}

export { ListCategorysController }
