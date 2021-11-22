import { Request, Response } from 'express'
import { ListSpecificationUsecase } from './ListSpecificationUseCase'

class ListSpecificationController{
  constructor(private listSpecificationUsecase: ListSpecificationUsecase){}

  handle(req: Request, res: Response): Response{
    const all = this.listSpecificationUsecase.execute()
    return res
    .status(200)
    .send(all)
  }
}

export { ListSpecificationController }

