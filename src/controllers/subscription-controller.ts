import IDatabase from '@base/infra/idatabase'
import INotification from '@base/infra/inotification'
import SendNotificationSubscriptionService from '@base/services/send-notification-subscription-service'
import { Request, Response } from 'express'

export default class SubscriptionController {
  #path = 'subscriptions'
  constructor (
    private readonly database: IDatabase,
    private readonly notification: INotification
  ) {}
  async notify (req: Request, res: Response) {
    const { body } = req
    try {
      const sendNotificationSubscriptionService = new SendNotificationSubscriptionService(
        this.database,
        this.notification
      )
      sendNotificationSubscriptionService.execute(body)
      res.sendStatus(201)
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  get path () {
    return this.#path
  }
}
