import webPush, { PushSubscription, SendResult } from 'web-push'
import INotification from './inotification'

export default class Notification implements INotification {
  constructor (
    private readonly subject: string,
    private readonly publicKey: string,
    private readonly privateKey: string
  ) {
    try {
      webPush.setVapidDetails(
        this.subject,
        this.publicKey,
        this.privateKey
      )
    } catch (error) {
      console.error('Failed to set VAPID details for web push notifications:', error)
    }
  }
  async send(destination: PushSubscription, content: Object): Promise<SendResult> {
    return webPush.sendNotification(destination, JSON.stringify(content))
  }
}