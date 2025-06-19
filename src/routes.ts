import { Router, Express } from 'express'
import MemberController from './controllers/member-controller'
import IDatabase from './infra/idatabase'
import LoginController from './controllers/login-controller'
import { validate } from './middlewares/authenticator'
import EventController from './controllers/event-controller'
import GroupController from './controllers/group-controller'
import ScaleController from './controllers/scale-controller'
import SubscriptionController from './controllers/subscription-controller'
import INotification from './infra/inotification'

export default function (app: Express, database: IDatabase, notification: INotification) {
  const router = Router()
  const loginController = new LoginController(database)
  router.post(`/${loginController.path}`, loginController.login.bind(loginController))
  app.use(router)
  const routerWithAuthenticator = Router()
  routerWithAuthenticator.use(validate)
  const memberControler = new MemberController(database)
  const eventController = new EventController(database)
  const groupController = new GroupController(database)
  const scaleController = new ScaleController(database)
  const subscriptionController = new SubscriptionController(database, notification)

  routerWithAuthenticator.post(`/${scaleController.path}`, scaleController.create.bind(scaleController))
  routerWithAuthenticator.get(`/${scaleController.path}`, scaleController.list.bind(scaleController))
  routerWithAuthenticator.delete(`/${scaleController.path}`, scaleController.remove.bind(scaleController))
  
  routerWithAuthenticator.post(`/${eventController.path}`, eventController.create.bind(eventController))
  routerWithAuthenticator.get(`/${eventController.path}`, eventController.list.bind(eventController))
  routerWithAuthenticator.delete(`/${eventController.path}`, eventController.remove.bind(eventController))
  
  routerWithAuthenticator.post(`/${groupController.path}`, groupController.create.bind(groupController))
  routerWithAuthenticator.get(`/${groupController.path}`, groupController.list.bind(groupController))
  routerWithAuthenticator.delete(`/${groupController.path}`, groupController.remove.bind(groupController))

  routerWithAuthenticator.post(`/${memberControler.path}`, memberControler.create.bind(memberControler))
  routerWithAuthenticator.get(`/${memberControler.path}`, memberControler.list.bind(memberControler))
  routerWithAuthenticator.delete(`/${memberControler.path}`, memberControler.remove.bind(memberControler))
  routerWithAuthenticator.put(`/${memberControler.path}/:id`, memberControler.update.bind(memberControler))

  app.use(routerWithAuthenticator)
}