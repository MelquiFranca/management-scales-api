import { DTOEvent, DTORepositoryResult } from '@base/dtos'
import IRepository from '@base/repositories/repository'

export default class CreateEventService {
  constructor (private readonly repository: IRepository) {}
  async execute (data: DTOEvent): Promise<DTORepositoryResult> {
    if (!data.date) throw new Error('Invalid date')
    if (data.dayShift?.length < 3) throw new Error('Invalid dayShift')
    if (!data.groupId?.length) throw new Error('Invalid groupId')
    if (data.unavaliableMemberIds && !(data.unavaliableMemberIds instanceof Array)) throw new Error('Invalid groupId')
    data.date = new Date(data.date)
    return this.repository.save(data)
  }
}