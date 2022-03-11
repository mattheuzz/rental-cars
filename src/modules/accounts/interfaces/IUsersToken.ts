import { UsersToken } from "../infra/typeorm/entities/UsersToken";

export interface ICreateUsersTokenDto {
  user_id: string
  expires_date: Date
  refresh_token: string
}

export interface IUsersTokenRepository {
  create(data: ICreateUsersTokenDto): Promise<UsersToken>
}
