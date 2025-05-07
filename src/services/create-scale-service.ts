import { DTOMessage, DTORepositoryResult, DTORosteredMember, DTOScale } from '@base/dtos'
import IRepository from '@base/repositories/repository'

export default class CreateScaleService {
  constructor (private readonly repository: IRepository) {}
  async execute (data: DTOScale): Promise<DTORepositoryResult> {
    if (!data.groupId) throw new Error('Invalid group')
    if (!data.eventId) throw new Error('Invalid event')
    if (!data.rosteredMembers?.length) throw new Error('Invalid rosteredMembers')
    data.messages = (data.messages || []).map(message => message as DTOMessage)
    data.rosteredMembers = data.rosteredMembers.map(message => message as DTORosteredMember)
    return this.repository.save(data)
  }
}