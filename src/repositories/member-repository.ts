import Member from '@base/entities/member'
import IRepository from './repository'
import { DTOFilter, DTOMember, DTORepositoryResult } from '@base/dtos'
import Database from '@base/infra/database'
import IDatabase from '@base/infra/idatabase'

export default class MemberRepository implements IRepository {
  #collectionName: string
  constructor (private readonly database: IDatabase, collectionName: string) {
    this.#collectionName = collectionName
  }
  async save (data: DTOMember): Promise<DTORepositoryResult> {
    return this.database.save(this.#collectionName, data)
  }
  async remove(id: string): Promise<DTORepositoryResult> {
    return Promise.resolve({ id, removed: true })
  }
  async update(data: Member): Promise<DTORepositoryResult> {
    return Promise.resolve({ id: data.id, updated: true })
  }
  async list<DTOMember>(filter: DTOFilter): Promise<DTOMember[]> {
    const members = await this.database.list<DTOMember>(this.#collectionName, filter)
    return members
  }
}