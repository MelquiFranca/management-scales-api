export default class Subscription {
  constructor(
    private readonly _id: string,
    readonly groupId: string,
    readonly endpoint: string,
    readonly expirationTime: Number,
    readonly userId: string,
    readonly keys: {
      p256dh: string
      auth: string
    }
  ) {}
  get id (): string {
    return this._id.toString()
  }
}
