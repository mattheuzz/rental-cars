import { v4 as uuidV4 } from "uuid"
import { hash } from "bcrypt"
import cretaeConnection from "../index"

const create = async () => {
  const connection = await cretaeConnection("localhost")

  const id = uuidV4()
  const password = await hash('123456', 8)

  await connection.query(
    `INSERT INTO USERS( id, name, email, password, admin, created_at, driver_license )
    values('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'XXXXX' )
    `
  )
  await connection.close
}
  
create().then(() => console.log("user admin created"))
