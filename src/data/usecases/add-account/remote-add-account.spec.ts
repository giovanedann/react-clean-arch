import { faker } from '@faker-js/faker'
import { type AccountModel, type AuthenticationParams } from 'domain/models'
import { type AddAccountParams } from 'domain/usecases'
import { HttpPostClientSpy } from 'tests/mocks/data/protocols/http'
import { mockAddAccount } from 'tests/mocks/domain/models/add-account'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

function createSut (url: string = faker.internet.url()): SutTypes {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return { httpPostClientSpy, sut }
}

describe('RemoteAddAccount', () => {
  it('should call HttpPostClient with the correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = createSut(url)
    const body = mockAddAccount()

    await sut.add(body)

    expect(httpPostClientSpy.url).toBe(url)
  })
})
