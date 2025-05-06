import { Router, Express } from 'express'
import MemberController from './controllers/member-controller'
import IDatabase from './infra/idatabase'
import LoginController from './controllers/login-controller'
import { validate } from './middlewares/authenticator'

export default function (app: Express, database: IDatabase) {
  const router = Router()
  const memberControler = new MemberController(database)
  const loginController = new LoginController(database)
  router.post(`/${loginController.path}`, loginController.login.bind(loginController))
  app.use(router)
  const routerWithAuthenticator = Router()
  routerWithAuthenticator.use(validate)
  routerWithAuthenticator.post(`/${memberControler.path}`, memberControler.create.bind(memberControler))
  routerWithAuthenticator.get(`/${memberControler.path}`, memberControler.list.bind(memberControler))
  routerWithAuthenticator.delete(`/${memberControler.path}`, memberControler.remove.bind(memberControler))
  app.use(routerWithAuthenticator)
}