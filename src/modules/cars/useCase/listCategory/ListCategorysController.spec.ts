import { hash } from "bcrypt"
import request from "supertest"
import { Connection } from "typeorm"
import { v4 as uuidV4 } from "uuid"
import { app } from "@shared/infra/http/app"
import createConnection from "../../../../shared/infra/typeorm/index"

let conenction: Connection
describe('List Category', () => {
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

  test('should be able to list all categories', async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: 'admin@email.com',
      password: '123456'
    })
    const { token } = responseToken.body
    await request(app).post("/categories").send({
      name: "fusca",
      description: "fusca"
    }).set({Authorization: `Bearer ${token}`})

    const response = await request(app).get("/categories")
    expect(response.status).toBe(200)
  })
})
