import { Request, Response } from 'express'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'
import { container } from 'tsyringe'

class CreateSpecificationController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body
    
    if (!name || !description) {
      return res.status(400).json({
        error: "Name and Description are required",
      });
    }

    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)

    await createSpecificationUseCase.execute({ name, description });

    return res.status(201).send()
  }
}

export { CreateSpecificationController }
