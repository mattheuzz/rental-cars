import { AppError } from "@errors/error";
import { ICreateUserDto } from "@modules/accounts/interfaces/IUser";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/Date/implementations/DayJsDateProvider";
import { CreateUserUseCase } from "../createUser/useCase";
import { AuthenticateUserUseCase } from "./userCase";


let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UserRepositoryInMemory
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory
let dateProvider: DayJsDateProvider
let createUserUseCase: CreateUserUseCase

describe("Authenticate users", () => {
  beforeEach(() => {
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory()
    dateProvider = new DayJsDateProvider();
    usersRepositoryInMemory = new UserRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider
    )
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
    await expect(authenticateUserUseCase.execute({
      email: "test2",
      password: "123456789"
    })
    ).rejects.toEqual(new AppError('Email or password invalid', 401))
  })

  it("should not be able to authenticate an user with wrong password", async () => {
    const user: ICreateUserDto = {
      name: "John Doe",
      password: "11111",
      email: "test3",
      driver_license: "11111111"
    }

    await createUserUseCase.execute(user)
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "123456789"
    })
    ).rejects.toEqual(new AppError('Email or password invalid', 401))
  })
})