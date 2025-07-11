import { DTORepositoryResult } from '@base/dtos'

export default interface IRepository {
  save (data: Object): Promise<DTORepositoryResult>
  remove (data: string, options?: Object): Promise<DTORepositoryResult>
  update (id: string, data: Object): Promise<DTORepositoryResult>
  list<Type>(data?: Object): Promise<Type[]>
  findByQuery<Type>(data?: Object, options?: Object): Promise<Type|null>
}