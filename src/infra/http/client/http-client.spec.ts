import { HttpClient } from './http-client'
import type axios from 'axios'
import {
  mockAxios,
  mockHttpResponse
} from 'tests/mocks/infra/http/client/axios'
import { mockPostRequest } from 'tests/mocks/data/protocols/http/http-post-client'

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
    it('should call axios.post with correct URL, verb, and body', async () => {
      const { sut, mockedAxios } = createSut()
      const request = mockPostRequest()
      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('should return the correct statusCode and body on axios.post', () => {
      const { sut, mockedAxios } = createSut()
      const request = mockPostRequest()
      const response = sut.post(request)

      const [resolvedValue] = mockedAxios.post.mock.results

      expect(response).toStrictEqual(resolvedValue.value)
    })

    it('should return the correct statusCode and body on failure on axios.post', () => {
      const { sut, mockedAxios } = createSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const request = mockPostRequest()
      const response = sut.post(request)

      const [resolvedValue] = mockedAxios.post.mock.results

      expect(response).toStrictEqual(resolvedValue.value)
    })
  })
})
