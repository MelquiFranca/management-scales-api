import { DTOMessage, DTORosteredMember } from '@base/dtos'

export default class Scale {
  constructor(
    private readonly _id: string,
    readonly groupId: string,
    readonly eventId: string,
    readonly messages: DTOMessage[],
    readonly rosteredMembers: DTORosteredMember[]
  ) {}
  get id (): string {
    return this._id.toString()
  }
}
