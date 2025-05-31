import { DTOMessage, DTONotification, DTORepositoryResult, DTORosteredMember } from '@base/dtos'
import IDatabase from '@base/infra/idatabase'
import INotification from '@base/infra/inotification'
import IRepository from '@base/repositories/repository'

export default class SendNotificationSubscriptionService {
  constructor (
    private readonly database: IDatabase,
    private readonly notification: INotification
  ) {}
  async execute (data: DTONotification): Promise<DTORepositoryResult> {
    return this.notification.send({}, data)
  }
}