import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./useCase";

class UpdateUserAvatarController{

  async handler(req: Request, res: Response): Promise<Response>{
    const { id } = req.user
    const avatar = req.file ? req.file.filename : undefined
    console.log(avatar)

    if (!avatar) {
      return res.status(400).json({ error: "Avatar is required" })
    }

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file: avatar
    })

    return res.status(204).send()
  }
}

export { UpdateUserAvatarController }