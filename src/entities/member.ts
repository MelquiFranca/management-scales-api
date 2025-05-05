export default class Member {
  constructor(
    private readonly _id: string,
    readonly name: string,
    readonly username: string,
    readonly birthday: Date,
    readonly photo?: string,
    private readonly password?: string,
  ) {}
  get id (): string {
    return this._id
  }
}