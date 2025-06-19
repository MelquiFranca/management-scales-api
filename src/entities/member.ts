export default class Member {
  constructor(
    private readonly _id: string,
    readonly name: string,
    readonly username: string,
    readonly birthday: Date,
    readonly groups: string[],
    readonly photo?: string,
    readonly type?: string,
    private readonly password?: string,
  ) {}
  get id (): string {
    return this._id.toString()
  }
}