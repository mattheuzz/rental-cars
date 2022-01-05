import { Connection, createConnection, getConnectionOptions } from 'typeorm'
console.log('[DB] Connecting to database...')

export default async (host= "database"): Promise <Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      host
    })
  )
}
