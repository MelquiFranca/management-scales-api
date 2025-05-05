import Database from '@base/infra/database'
import IDatabase from '@base/infra/idatabase'
import MemberRepository from '@base/repositories/member-repository'
import IRepository from '@base/repositories/repository'
import CreateMemberService from '@base/services/create-member-service'
import ListMemberService from '@base/services/list-member-service'
import RemoveMemberService from '@base/services/remove-member-service'
import { Request, Response } from 'express'

export default class MemberController {
  #collectionName = 'members'
  #repository: IRepository
  constructor (database: IDatabase) {
    this.#repository = new MemberRepository(database, this.path)
  }
  async create (req: Request, res: Response) {
    const { body } = req
    try {
      const createMemberService = new CreateMemberService(this.#repository)
      const created = await createMemberService.execute(body)
      res.json(created)
    } catch (error) {
      res.status(400).json(error)
    }
  }
  async list (req: Request, res: Response) {
    try {
      const listMemberService = new ListMemberService(this.#repository)
      const members = await listMemberService.execute()
      res.json({ members })
    } catch (error) {
      res.status(400).json(error)
    }
  }
  async remove (req: Request, res: Response) {
    const { body } = req
    try {
      const removeMemberService = new RemoveMemberService(this.#repository)
      const removed = await removeMemberService.execute(body.id)
      res.json(removed)
    } catch (error) {
      res.status(400).json(error)
    }
  }
  get path () {
    return this.#collectionName
  }
}
