import { AppError } from "@errors/error";
import { UsersRepositorys } from "@modules/accounts/repositories/Users";
import { NextFunction, Request, Response } from "express";


export const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user

  const usersRepository = new UsersRepositorys()
  const user = await usersRepository.findById(id)

  if (!user.admin) {
    throw new AppError("User is not a admin")
  }
  return next()
}