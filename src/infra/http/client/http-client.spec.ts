import { faker } from '@faker-js/faker'
import { HttpClient } from './http-client'
import axios from 'axios'
import { HttpPostParams } from 'data/protocols/http'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResolvedValue = {
  data: JSON.parse(faker.datatype.json()),
  status: faker.datatype.number()
}

mockedAxios.post.mockResolvedValue(mockedAxiosResolvedValue)

function createSut (): HttpClient {
  return new HttpClient()
}

function mockPostRequest (): HttpPostParams<any> {
  const randomObject = JSON.parse(faker.datatype.json())

  return ({
    url: faker.internet.url(),
    body: randomObject
  })
}

describe('HttpClient', () => {
  it('should call axios with correct URL, verb, and body', async () => {
    const sut = createSut()
    const request = mockPostRequest()
    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('should return the correct statusCode and body', async () => {
    const sut = createSut()
    const request = mockPostRequest()
    const response = await sut.post(request)

    expect(response).toStrictEqual({
      statusCode: mockedAxiosResolvedValue.status,
      body: mockedAxiosResolvedValue.data
    })
  })
})
