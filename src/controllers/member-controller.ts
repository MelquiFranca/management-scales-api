import { DTOMember } from '@base/dtos'
import IDatabase from '@base/infra/idatabase'
import MemberRepository from '@base/repositories/member-repository'
import IRepository from '@base/repositories/repository'
import CreateMemberService from '@base/services/create-member-service'
import ListMemberService from '@base/services/list-member-service'
import RemoveMemberService from '@base/services/remove-member-service'
import UpdateMemberService from '@base/services/update-member-service'
import { Request, Response } from 'express'

interface CustomRequest extends Request {
  token: {
    groupId: string
  },
  groupId: string
}
export default class MemberController {
  #path = 'members'
  #repository: IRepository
  constructor (database: IDatabase) {
    this.#repository = new MemberRepository(database)
  }
  async create (req: Request, res: Response) {
    const { body } = req
    try {
      const createMemberService = new CreateMemberService(this.#repository)
      const created = await createMemberService.execute(body)
      res.json(created)
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  async update (req: Request, res: Response) {
    const { body, params: { id } } = req
    try {
      const createMemberService = new UpdateMemberService(this.#repository)
      const created = await createMemberService.execute(id, body)
      res.json(created)
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  async list (req: Request, res: Response) {
    try {
      const { token } = (req as CustomRequest)
      const listMemberService = new ListMemberService(this.#repository)
      const members = await listMemberService.execute({ groupId: token?.groupId?.toString() })
      res.json({ members })
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  async remove (req: Request, res: Response) {
    try {
      const { body } = req
      const removeMemberService = new RemoveMemberService(this.#repository)
      const removed = await removeMemberService.execute(body.id)
      res.json(removed)
    } catch (error) {
      console.error(error)
      res.status(400).json(error)
    }
  }
  async removeGroup (req: Request, res: Response) {
    try {
      const { body } = req
      const removeMemberService = new RemoveMemberService(this.#repository)
      
      const removed = await removeMemberService.execute(body.id, { groupId: body.groupId })
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
