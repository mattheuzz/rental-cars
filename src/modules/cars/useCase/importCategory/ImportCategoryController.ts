import{ Request, Response} from 'express'
import { container } from 'tsyringe'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

class ImportCategoryController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
    if(file){
      await importCategoryUseCase.execute(file)
      return res
      .status(201)
      .send()
    }
    return res
    .status(400)
    .send()
  }
}

export{ ImportCategoryController }
