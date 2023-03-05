import { HttpClient } from './http-client'
import type axios from 'axios'
import {
  mockAxios,
  mockHttpResponse
} from 'tests/mocks/infra/http/client/axios'
import { mockPostRequest } from 'tests/mocks/data/protocols/http/http-post-client'
import { mockGetRequest } from 'tests/mocks/data/protocols/http/http-get-client'

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

    it('should call axios.post with correct URL, verb, and body', async () => {
      const { sut, mockedAxios } = createSut()
      const request = mockPostRequest()
      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('should return the correct statusCode and body on axios.post', async () => {
      const { sut, mockedAxios } = createSut()
      const request = mockPostRequest()
      const response = await sut.post(request)

      const { status, data } = await mockedAxios.post.mock.results[0].value

      expect(response).toStrictEqual({
        statusCode: status,
        body: data
      })
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

  describe('[GET]', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    afterAll(() => {
      jest.clearAllMocks()
      jest.restoreAllMocks()
    })

    it('should call axios.get with correct URL', async () => {
      const { sut, mockedAxios } = createSut()
      const request = mockGetRequest()
      await sut.get(request)

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })

    it('should return the correct statusCode and body on axios.get', async () => {
      const { sut, mockedAxios } = createSut()
      const request = mockPostRequest()
      const response = await sut.get(request)

      const { status, data } = await mockedAxios.get.mock.results[0].value

      expect(response).toStrictEqual({
        statusCode: status,
        body: data
      })
    })
  })
})
