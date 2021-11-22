import{ Request, Response} from 'express'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { file } = req

    if(!file){
      return res
      .status(400)
      .json({
        error: 'File is required'
      })
    }

    this.importCategoryUseCase.execute(file)
    return res
    .status(201)
    .send()
  }
}

export{ ImportCategoryController }
