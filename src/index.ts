
import MemberController from './controllers/member-controller'
import Database from './infra/database'
import app from './infra/server'

(async () => {
  const uri = 'mongodb://localhost:27017'
  const databaseName = 'management-squad'
  const port = 8002
  const database = new Database(uri, databaseName)
  await database.connect()
  const memberControler = new MemberController(database)
  app.post(`/${memberControler.path}`, memberControler.create.bind(memberControler))
  app.get(`/${memberControler.path}`, memberControler.list.bind(memberControler))
  app.delete(`/${memberControler.path}`, memberControler.remove.bind(memberControler))

  app.listen(port, () => console.log(`Running in port ${port}`))
  process.addListener('SIGTERM', async () => {
    await database.disconnect()
  })
})()