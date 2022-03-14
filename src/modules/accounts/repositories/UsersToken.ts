import { getRepository, Repository } from "typeorm";
import { UsersToken } from "../infra/typeorm/entities/UsersToken";
import { ICreateUsersTokenDto, IUsersTokenRepository } from "../interfaces/IUsersToken";

export class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UsersToken>

  constructor(){
    this.repository = getRepository(UsersToken)
  }

  async create({ refresh_token, user_id, expires_date }: ICreateUsersTokenDto): Promise<UsersToken> {
    const userToken = this.repository.create({
      refresh_token,
      user_id,
      expires_date
    })

    await this.repository.save(userToken)
    return userToken
  }

  async findUserIdAndToken(user_id: string, token: string): Promise<UsersToken | undefined> {
    const usersTokens = await this.repository.findOne({
      where: {
        user_id,
        refresh_token: token
      }
    })
    return usersTokens
  }
  async deleteById(id: string): Promise<void | undefined> {
    await this.repository.delete(id)
  }
}
