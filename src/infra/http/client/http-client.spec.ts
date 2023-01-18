import { HttpClient } from './http-client'
import { mockAxios } from '../tests/mocks'
import axios from 'axios'
import { mockPostRequest } from 'data/tests/mocks'

jest.mock('axios')

type SutTypes = {
  sut: HttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

function createSut (): SutTypes {
  const sut = new HttpClient()
  const mockedAxios = mockAxios()

  return { sut, mockedAxios }
}

describe('HttpClient', () => {
  it('should call axios with correct URL, verb, and body', async () => {
    const { sut, mockedAxios } = createSut()
    const request = mockPostRequest()
    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = createSut()
    const request = mockPostRequest()
    const response = sut.post(request)

    const [resolvedValue] = mockedAxios.post.mock.results

    expect(response).toStrictEqual(resolvedValue.value)
  })
})
