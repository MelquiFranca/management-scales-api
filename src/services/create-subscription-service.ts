import { DTOEvent, DTORepositoryResult, DTOSubscription } from '@base/dtos'
import IRepository from '@base/repositories/repository'

export default class CreateSubscriptionService {
  constructor (private readonly repository: IRepository) {}
  async execute (data: DTOSubscription): Promise<DTORepositoryResult> {
    if (!data.endpoint) throw new Error('Invalid subscription: endpoint')
    if (!Number.isInteger(data.expirationTime)) throw new Error('Invalid subscription: expirationTime')
    if (!data.userId) throw new Error('Invalid subscription: userId')
    if (!data.keys?.auth || !data.keys?.p256dh) throw new Error('Invalid subscription: keys')
    return this.repository.update(data)
  }
}