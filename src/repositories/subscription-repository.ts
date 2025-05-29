import IRepository from './repository'
import { DTOSubscription, DTOFilter, DTORepositoryResult, DTOUpdateSubscription } from '@base/dtos'
import IDatabase from '@base/infra/idatabase'
import Subscription from '@base/entities/subscription'

export default class SubscriptionRepository implements IRepository {
  constructor (
    private readonly database: IDatabase,
    private readonly collectionName: string = 'subscriptions'
  ) {}
  async save (data: DTOSubscription): Promise<DTORepositoryResult> {
    return this.database.save(this.collectionName, data)
  }
  async remove(id: string, filter?: Object): Promise<DTORepositoryResult> {
    return this.database.remove(this.collectionName, id, filter)
  }
  async update(data: Subscription): Promise<DTORepositoryResult> {
    return  this.database.update(
      this.collectionName,
      {
        userId: data.userId,
        groupId: data.groupId
      },
      {
        $set: {
          endpoint: data.endpoint,
          expirationTime: data.expirationTime,
          keys: data.keys
        }
      }
    )
  }
  async list<DTOSubscription>(filter: DTOFilter): Promise<DTOSubscription[]> {
    return this.database.list<DTOSubscription>(this.collectionName, filter)
  }
  async findByQuery<DTOSubscription>(filter: DTOFilter, options?: Object): Promise<DTOSubscription|null> {
    return this.database.find<DTOSubscription|null>(this.collectionName, filter, options)
  }
}