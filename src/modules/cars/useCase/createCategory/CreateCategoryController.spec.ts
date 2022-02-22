import { hash } from "bcrypt"
import request from "supertest"
import { Connection } from "typeorm"
import { v4 as uuidV4 } from "uuid"
import { app } from "@shared/infra/http/app"
import createConnection from "../../../../shared/infra/typeorm/index"

let conenction: Connection
describe("Create Category Controller", () =>{
  beforeAll(async () => {
    conenction = await createConnection()
    await conenction.runMigrations()

    const id = uuidV4()
    const password = await hash('123456', 8)

    await conenction.query(
      `INSERT INTO USERS( id, name, email, password, admin, created_at, driver_license )
      values('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'XXXXX' )`
    )
  })

  afterAll(async () => {
    await conenction.dropDatabase()
    await conenction.close()
  })

  test("should be able to create a new category", async() =>{
    const responseToken = await request(app).post("/sessions").send({
      email: 'admin@email.com',
      password: '123456'
    })
     const { token } = responseToken.body

    const response = await request(app).post("/categories").send({
        name: "teste",
        description: "teste"
      }).set({Authorization: `Bearer ${token}`})
    expect(response.status).toBe(201)
  })
})