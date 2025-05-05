import Member from '@base/entities/member'
import IRepository from '@base/repositories/repository'
import CreateMemberService from '@base/services/create-member-service'
import ListMemberService from '@base/services/list-member-service'
import RemoveMemberService from '@base/services/remove-member-service'
import UpdateMemberService from '@base/services/update-member-service'
import assert from 'assert'
import { describe, it } from 'node:test'

describe('members suite tests', () => {
  const birthday = new Date()
  const expectedResult = { id: '123' }
  const mockRepo: IRepository = {
    save: () => Promise.resolve({ id: expectedResult.id }),
    remove: () => Promise.resolve({ id: expectedResult.id, removed: true }),
    update: () => Promise.resolve({ id: expectedResult.id, updated: true }),
    list: () => Promise.resolve(Array(3).fill(new Member('123', 'Sunda', 'sunda', new Date()))),
  }
  describe('create members', () => {
    describe('sucess cases', () => {
      it('Should create a member', async () => {
        const createMemberService = new CreateMemberService(mockRepo)
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
      it('should update a member by id', async () => {
        const data = {
          _id: '123',
          name: 'Bobra',
          birthday,
          username: 'foo',
          type: 'user',
          password: '123'
        }
        const updateMemberService = new UpdateMemberService(mockRepo)
        const result = await updateMemberService.execute(data)
        assert.deepStrictEqual(result, { ...expectedResult, updated: true })
      })
      it('should list members', async () => {
        const filter = {
          groupId: '123'
        }
        const listMemberService = new ListMemberService(mockRepo)
        const result = await listMemberService.execute(filter)
        const expectedResult = Array(3).fill(new Member('123', 'Sunda', 'sunda', new Date()))
        assert.deepStrictEqual(result, expectedResult)
      })
    })
    describe('fail cases', () => {
      it('should fail to create member if invalid password', async () => {
        const createMemberService = new CreateMemberService(mockRepo)
        const data = {
          name: 'Sunda Foo',
          username: 'sunda',
          birthday,
          type: 'user',
          groupId: '456',
          password: '12',
          photo: ''
        }
        try {
          await createMemberService.execute(data)
          throw new Error('should not pass')
        } catch (error) {
          assert.deepStrictEqual(error, new Error('Invalid password'))
        }
      })
      it('should fail to create member if invalid name', async () => {
        const createMemberService = new CreateMemberService(mockRepo)
        const data = {
          name: '',
          username: 'sunda',
          birthday,
          type: 'user',
          groupId: '456',
          password: '12345',
          photo: ''
        }
        try {
          await createMemberService.execute(data)
          throw new Error('should not pass')
        } catch (error) {
          assert.deepStrictEqual(error, new Error('Invalid name'))
        }
      })
      it('should fail to create member if invalid username', async () => {
        const createMemberService = new CreateMemberService(mockRepo)
        const data = {
          name: 'Sunda',
          username: 'su',
          birthday,
          type: 'user',
          groupId: '456',
          password: '12345',
          photo: ''
        }
        try {
          await createMemberService.execute(data)
          throw new Error('should not pass')
        } catch (error) {
          assert.deepStrictEqual(error, new Error('Invalid username'))
        }
      })
      it('should fail to create member if invalid groupId', async () => {
        const createMemberService = new CreateMemberService(mockRepo)
        const data = {
          name: 'Sunda',
          username: 'sunda',
          birthday,
          type: 'user',
          groupId: '',
          password: '12345',
          photo: ''
        }
        try {
          await createMemberService.execute(data)
          throw new Error('should not pass')
        } catch (error) {
          assert.deepStrictEqual(error, new Error('Invalid groupId'))
        }
      })
    })
  })
})