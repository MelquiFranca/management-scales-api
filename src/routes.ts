import { Router, Express } from 'express'
import MemberController from './controllers/member-controller'
import IDatabase from './infra/idatabase'
import LoginController from './controllers/login-controller'
import { validate } from './middlewares/authenticator'
import EventController from './controllers/event-controller'

export default function (app: Express, database: IDatabase) {
  const router = Router()
  const loginController = new LoginController(database)
  router.post(`/${loginController.path}`, loginController.login.bind(loginController))
  app.use(router)
  const memberControler = new MemberController(database)
  const eventController = new EventController(database)
  const routerWithAuthenticator = Router()
  routerWithAuthenticator.use(validate)
  routerWithAuthenticator.post(`/${eventController.path}`, eventController.create.bind(eventController))
  routerWithAuthenticator.get(`/${eventController.path}`, eventController.list.bind(eventController))
  routerWithAuthenticator.post(`/${memberControler.path}`, memberControler.create.bind(memberControler))
  routerWithAuthenticator.get(`/${memberControler.path}`, memberControler.list.bind(memberControler))
  routerWithAuthenticator.delete(`/${memberControler.path}`, memberControler.remove.bind(memberControler))
  app.use(routerWithAuthenticator)
}