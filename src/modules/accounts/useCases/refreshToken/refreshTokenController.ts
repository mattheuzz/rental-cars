import { IUsersTokenRepository } from "@modules/accounts/interfaces/IUsersToken";
import { UsersTokenRepository } from "@modules/accounts/repositories/UsersToken";
import { Request, Response } from "express";
import { container, inject } from "tsyringe";
import { RefreshTokenUseCase } from "./refreshTokentUseCase";


export class RefreshTokenController {
  
  async handle(req: Request, res: Response): Promise<Response> {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase)
    const refresh_token = await refreshTokenUseCase.execute(token)
    return res.json(refresh_token)
  }
}
