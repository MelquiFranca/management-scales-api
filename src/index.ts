import LoginController from './controllers/login-controller'
import Database from './infra/database'
import app from './infra/server'
import routes from './routes'

(async () => {
  const uri = 'mongodb://localhost:27017'
  const databaseName = 'management-squad'
  const port = 8002
  const database = new Database(uri, databaseName)
  await database.connect()
  routes(app, database)
  app.listen(port, () => console.log(`Running in port ${port}`))
  process.addListener('SIGTERM', async () => {
    await database.disconnect()
  })
})()