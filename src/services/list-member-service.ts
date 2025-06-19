import { DTOFilter, DTOMember } from '@base/dtos'
import Member from '@base/entities/member'
import IRepository from '@base/repositories/repository'

export default class ListMemberService {
  constructor (private readonly repository: IRepository) {}
  async execute (filter?: DTOFilter): Promise<Member[]> {
    const query = {
      ...(filter?.groupId && { groups: { $in: [filter.groupId] } }),
    }
    const members = await this.repository.list<DTOMember>(query)
    return members.map(member => new Member(
      member._id.toString(),
      member.name,
      member.username,
      member.birthday,
      member.groups,
      member.photo,
      member.type,
    ))
  }
} 