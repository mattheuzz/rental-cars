import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./uploadCarImageUseCase";

interface IFile {
  filename: string
}

export class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const image = req.files as IFile[]

    const carImageUseCase = container.resolve(UploadCarImageUseCase)

    const image_name = image.map(image => image.filename)

    const carImage = await carImageUseCase.execute({
      car_id: id,
      image_name
    })

    return res.status(201).send(carImage)
  }
}

