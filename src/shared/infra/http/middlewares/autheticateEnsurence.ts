import { NextFunction, request, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import dotenv from "dotenv"
import { IPayload } from './interfaces/IPayload'
import { UsersRepositorys } from '@modules/accounts/repositories/Users'
import { AppError } from '@errors/error'

dotenv.config()

async function ensureAuthenticated (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

try {  
  const { sub } = verify(token, process.env.JWT as string) as IPayload
  const user_id = sub

  const usersRepository = new UsersRepositorys()
  const user = await usersRepository.findById(user_id)
  console.log(user)

  if (!user) {
    throw new AppError ('User not found', 404)
  }
  
  request.user = {
    id: user_id
  }

  next()

} catch (e) {
  throw new AppError ('Invalid token', 401)
  }
}

export { ensureAuthenticated }