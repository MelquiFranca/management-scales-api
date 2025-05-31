export default interface INotification {
  send(destination: Object, content: Object): Promise<Object>
}