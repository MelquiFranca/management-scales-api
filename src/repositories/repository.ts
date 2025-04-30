import { DTORepositoryResult } from "@base/dtos"

export default interface IRepository {
  save (data: Object): Promise<DTORepositoryResult>
  remove (data: string): Promise<DTORepositoryResult>
}