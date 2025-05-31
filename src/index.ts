import LoginController from './controllers/login-controller'
import Database from './infra/database'
import Notification from './infra/notification'
import app from './infra/server'
import routes from './routes'

(async () => {
  const uri = 'mongodb://localhost:27017'
  const databaseName = 'management-squad'
  const port = process.env?.PORT || 8002
  const subject = process.env?.EMAIL_PUSH || 'management-squad@localhost'
  const publicKey = process.env?.PUBLIC_KEY_PUSH || 'teste-public-key'
  const privateKey = process.env?.PRIVATE_KEY_PUSH || 'teste-private-key'

  try {
    const notification = new Notification(subject, publicKey, privateKey)
    const database = new Database(uri, databaseName)
    await database.connect()
    
    routes(app, database, notification)
    app.listen(port, () => console.log(`Running in port ${port}`))
    
    process.addListener('SIGTERM', async () => {
      await database.disconnect()
    })
  } catch (error) {
    console.error('Failed to start the application:', error)
    process.exit(1)
  }
})()