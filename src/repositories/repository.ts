import { DTORepositoryResult } from '@base/dtos'

export default interface IRepository {
  save (data: Object): Promise<DTORepositoryResult>
  remove (data: string): Promise<DTORepositoryResult>
  update (data: Object): Promise<DTORepositoryResult>
  list<Type>(data?: Object): Promise<Type[]>
  findByQuery<Type>(data?: Object, options?: Object): Promise<Type|null>
}