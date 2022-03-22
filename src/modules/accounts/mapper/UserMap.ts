import { instanceToInstance } from "class-transformer";
import { Users } from "../infra/typeorm/entities/Users";
import { IUserResponseDTO } from "../interfaces/IUser";


export class UserMap {

  static toDTO({ 
    email,
    name,
    id,
    avatar,
    getAvatarUrl
   }: Users): IUserResponseDTO {
     const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      getAvatarUrl
     })
    return user as IUserResponseDTO
  }
}
