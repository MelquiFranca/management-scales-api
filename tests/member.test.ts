import MemberRepository from '@base/repositories/member-repository'
import IRepository from '@base/repositories/repository'
import CreateMemberService from '@base/services/create-member-service'
import assert from 'assert'
import { describe, it, afterEach } from 'node:test'

describe('members suite tests', () => {
  describe('create members', () => {
    describe('sucess cases', () => {
      it('Should create a member', async () => {
        const expectedResult = { id: '123' }
        const mockRepo: IRepository = {
          save: () => Promise.resolve({ _id: expectedResult.id })
        }
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
    })
  })
})