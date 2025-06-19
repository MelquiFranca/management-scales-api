import { DTOMember } from '@base/dtos'
import IDatabase from '@base/infra/idatabase'
import IRepository from '@base/repositories/repository'
import ScaleRepository from '@base/repositories/scale-repository'
import CreateScaleService from '@base/services/create-scale-service'
import ListScaleService from '@base/services/list-scale-service'
import RemoveScaleService from '@base/services/remove-scale-service'
import { Request, Response } from 'express'

interface CustomRequest extends Request {
  token: DTOMember
}
export default class ScaleController {
  #path = 'scales'
  #repository: IRepository
  constructor (database: IDatabase) {
    this.#repository = new ScaleRepository(database)
  }
  async create (req: Request, res: Response) {
    const { body } = req
    try {
      const createScaleService = new CreateScaleService(this.#repository)
      const created = await createScaleService.execute(body)
      res.json(created)
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  async list (req: Request, res: Response) {
    try {
      const { token } = (req as CustomRequest)
      const listScaleService = new ListScaleService(this.#repository)
      const scales = await listScaleService.execute({ groupId: token.groupId?.toString() })
      res.json({ scales })
    } catch (error) {
      res.status(400).json(error)
    }
  }
  async remove (req: Request, res: Response) {
    try {
      const { body } = req
      const { token } = (req as CustomRequest)
      const removeScaleService = new RemoveScaleService(this.#repository)
      const removed = await removeScaleService.execute(body.id, { groupId: token.groupId?.toString() })
      res.json(removed)
    } catch (error) {
      res.status(400).json(error)
    }
  }
  get path () {
    return this.#path
  }
}
