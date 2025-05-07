import { DTOMember } from '@base/dtos'
import IDatabase from '@base/infra/idatabase'
import GroupRepository from '@base/repositories/group-repository'
import IRepository from '@base/repositories/repository'
import CreateGroupService from '@base/services/create-group-service'
import ListGroupService from '@base/services/list-group-service'
import RemoveGroupService from '@base/services/remove-group-service'
import { Request, Response } from 'express'

interface CustomRequest extends Request {
  token: DTOMember
}
export default class GroupController {
  #path = 'groups'
  #repository: IRepository
  constructor (database: IDatabase) {
    this.#repository = new GroupRepository(database)
  }
  async create (req: Request, res: Response) {
    const { body } = req
    try {
      const createGroupService = new CreateGroupService(this.#repository)
      const created = await createGroupService.execute(body)
      res.json(created)
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  async list (req: Request, res: Response) {
    try {
      const { token } = (req as CustomRequest)
      const listGroupService = new ListGroupService(this.#repository)
      const events = await listGroupService.execute()
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
      const removeGroupService = new RemoveGroupService(this.#repository)
      const removed = await removeGroupService.execute(body.id)
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
