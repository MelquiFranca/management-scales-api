import MemberRepository from '@base/repositories/member-repository'
import IRepository from '@base/repositories/repository'
import CreateMemberService from '@base/services/create-member-service'
import RemoveMemberService from '@base/services/remove-member-service'
import assert from 'assert'
import { describe, it, afterEach } from 'node:test'

describe('members suite tests', () => {
  describe('create members', () => {
    describe('sucess cases', () => {
      const expectedResult = { id: '123' }
      const mockRepo: IRepository = {
        save: () => Promise.resolve({ id: expectedResult.id }),
        remove: () => Promise.resolve({ id: expectedResult.id, removed: true })
      }
      it('Should create a member', async () => {
        const createMemberService = new CreateMemberService(mockRepo)
        const birthday = new Date()
        const data = {
          name: 'Sunda Foo',
          username: 'sunda',
          birthday,
          type: 'user',
          groupId: '456',
          password: '123',
          photo: ''
        }
        const result = await createMemberService.execute(data)
        assert.deepStrictEqual(result, expectedResult)
      })
      it('should remove a member by id', async () => {
        const removeMemberService = new RemoveMemberService(mockRepo)
        const result = await removeMemberService.execute('123')
        assert.deepStrictEqual(result, { ...expectedResult, removed: true })
      })
    })
  })
})