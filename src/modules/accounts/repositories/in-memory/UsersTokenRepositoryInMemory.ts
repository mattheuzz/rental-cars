import { UsersToken } from "@modules/accounts/infra/typeorm/entities/UsersToken";
import { ICreateUsersTokenDto, IUsersTokenRepository } from "@modules/accounts/interfaces/IUsersToken";


export class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  usersTokens!: UsersToken[]

  async create({ user_id, expires_date, refresh_token }: ICreateUsersTokenDto): Promise<UsersToken> {
      const userTokens = new UsersToken()
      Object.assign(userTokens, {
        user_id,
        expires_date,
        refresh_token,
      })
      console.log(userTokens)

      this.usersTokens.push(userTokens)
      return userTokens
  }
  async findUserIdAndToken(user_id: string, token: string): Promise<UsersToken | undefined> {
    const userToken = this.usersTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === token)
    return userToken as UsersToken
  }

  async deleteById(id: string): Promise<void | undefined> {
    const userToken = this.usersTokens.find(userToken => userToken.id === id)
    if (userToken) {
      this.usersTokens.splice(this.usersTokens.indexOf(userToken), 1)
    }
  }

  async findByToken(token: string): Promise<UsersToken | undefined> {
    const userToken = this.usersTokens.find(userToken => userToken.refresh_token === token)
    return userToken as UsersToken
  }
}
