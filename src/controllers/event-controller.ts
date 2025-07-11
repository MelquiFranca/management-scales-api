import { DTOMember } from '@base/dtos'
import IDatabase from '@base/infra/idatabase'
import EventRepository from '@base/repositories/event-repository'
import IRepository from '@base/repositories/repository'
import CreateEventService from '@base/services/create-event-service'
import ListEventService from '@base/services/list-event-service'
import RemoveEventService from '@base/services/remove-event-service'
import { Request, Response } from 'express'

interface CustomRequest extends Request {
  token: DTOMember,
}
export default class EventController {
  #path = 'events'
  #repository: IRepository
  constructor (database: IDatabase) {
    this.#repository = new EventRepository(database)
  }
  async create (req: Request, res: Response) {
    const { body } = req
    try {
      const createEventService = new CreateEventService(this.#repository)
      const created = await createEventService.execute(body)
      res.json(created)
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  async list (req: Request, res: Response) {
    try {
      const { token } = (req as CustomRequest)
      const listEventService = new ListEventService(this.#repository)
      const events = await listEventService.execute({ groupId: token.groupId?.toString() })
      res.json({ events })
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  async remove (req: Request, res: Response) {
    try {
      const { body } = req
      const { token } = (req as CustomRequest)
      const removeEventService = new RemoveEventService(this.#repository)
      const removed = await removeEventService.execute(body.id, { groupId: token.groupId?.toString() })
      res.json(removed)
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  get path () {
    return this.#path
  }
}
