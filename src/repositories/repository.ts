import { DTORepositoryResult } from '@base/dtos'
import Member from '@base/entities/member'

export default interface IRepository {
  save (data: Object): Promise<DTORepositoryResult>
  remove (data: string): Promise<DTORepositoryResult>
  update (data: Object): Promise<DTORepositoryResult>
  list (data?: Object): Promise<Member[]>
}