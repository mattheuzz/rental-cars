import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import dotenv from "dotenv"
import { IPayload } from './interfaces/IPayload'
import { UsersRepositorys } from '../modules/accounts/repositories/Users'

dotenv.config()

async function ensureAuthenticated (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error('Token is missing')
  }

  const [, token] = authHeader.split(' ')

try {  
  const { sub } = verify(token, process.env.JWT as string) as IPayload
  const user_id = sub

  const usersRepository = new UsersRepositorys()
  const user = await usersRepository.findById(user_id)
  console.log(user)

  if (!user) {
    throw new Error('User not found')
  }
  
  next()

} catch (e) {
  throw new Error ('Invalid token')
  }
}

export { ensureAuthenticated }