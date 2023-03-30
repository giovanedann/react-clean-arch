import { HttpClient } from './http-client'
import type axios from 'axios'
import {
  mockAxios,
  mockHttpResponse
} from 'tests/mocks/infra/http/client/axios'
import { mockHttpRequest } from 'tests/mocks/data/protocols/http/http-client'

jest.mock('axios')

type SutTypes = {
  sut: HttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

function createSut(): SutTypes {
  const sut = new HttpClient()
  const mockedAxios = mockAxios()

  return { sut, mockedAxios }
}

describe('HttpClient', () => {
  describe('[POST]', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    afterAll(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it('should call axios.request with correct URL, verb, and body', async () => {
      const { sut, mockedAxios } = createSut()
      const request = mockHttpRequest()
      await sut.request(request)

      expect(mockedAxios.request).toHaveBeenCalledWith({
        url: request.url,
        data: request.body,
        headers: request.headers,
        method: request.method
      })
    })

    it('should return the correct statusCode and body on axios.request', async () => {
      const { sut, mockedAxios } = createSut()
      const request = mockHttpRequest()
      const response = await sut.request(request)

      const { status, data } = await mockedAxios.request.mock.results[0].value

      expect(response).toStrictEqual({
        statusCode: status,
        body: data
      })
    })

    it('should return the correct statusCode and body on failure on axios.request', () => {
      const { sut, mockedAxios } = createSut()
      mockedAxios.request.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const request = mockHttpRequest()
      const response = sut.request(request)

      const [resolvedValue] = mockedAxios.request.mock.results

      expect(response).toStrictEqual(resolvedValue.value)
    })
  })
})
