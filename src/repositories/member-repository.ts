import Member from '@base/entities/member'
import IRepository from './repository'
import { DTORepositoryResult } from '@base/dtos'

export default class MemberRepository implements IRepository {
  async save (data: Member): Promise<DTORepositoryResult> {
    return Promise.resolve({ id: '' })
  }
  async remove(id: string): Promise<DTORepositoryResult> {
    return Promise.resolve({ id, removed: true })
  }
}