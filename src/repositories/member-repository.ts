import Member from '@base/entities/member'
import IRepository from './repository'
import { DTOMember, DTORepositoryResult } from '@base/dtos'

export default class MemberRepository implements IRepository {
  async save (data: DTOMember): Promise<DTORepositoryResult> {
    return Promise.resolve({ id: '' })
  }
  async remove(id: string): Promise<DTORepositoryResult> {
    return Promise.resolve({ id, removed: true })
  }
  async update(data: Member): Promise<DTORepositoryResult> {
    return Promise.resolve({ id: data.id, updated: true })
  }
}