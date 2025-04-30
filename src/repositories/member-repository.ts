import Member from '@base/entities/member'
import IRepository from './repository'

type DTOResult = {
  _id: string
}
export default class MemberRepository implements IRepository {
  async save (data: Member): Promise<DTOResult> {
    return Promise.resolve({ _id: '' })
  }
}