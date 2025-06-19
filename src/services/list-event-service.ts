import { DTOFilter } from '@base/dtos'
import EventScale from '@base/entities/event'
import IRepository from '@base/repositories/repository'

export default class ListEventService {
  constructor (private readonly repository: IRepository) {}
  async execute (filter?: DTOFilter): Promise<EventScale[]> {
    const events = await this.repository.list<EventScale>({
      ...(filter?.groupId && { groups: { $in: filter.groupId } }),
    })
    return events.map(event => new EventScale(
      event.id,
      event.groupId,
      event.date,
      event.dayShift,
      event.unavaliableMemberIds
    ))
  }
} 