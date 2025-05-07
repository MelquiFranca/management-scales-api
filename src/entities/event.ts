export default class EventScale {
  constructor(
    private readonly _id: string,
    readonly groupId: string,
    readonly date: Date,
    readonly dayShift: string,
    readonly unavaliableMemberIds: string[]
  ) {}
  get id (): string {
    return this._id
  }
}
