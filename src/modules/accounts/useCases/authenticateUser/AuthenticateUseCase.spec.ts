import { AppError } from "../../../../errors/error";
import { ICreateUserDto } from "../../interfaces/IUser";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/useCase";
import { AuthenticateUserUseCase } from "./userCase";


let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate users", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    

  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDto = {
      name: "John Doe",
      password: "123456",
      email: "test",
      driver_license: "123456789"
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    console.log(result)
    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "test2",
        password: "123456789"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate an user with wrong password", async () => {
    expect(async () => {
      const user: ICreateUserDto = {
        name: "John Doe",
        password: "11111",
        email: "test3",
        driver_license: "11111111"
      }
  
      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "123456789"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})