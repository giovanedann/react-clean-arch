import { faker } from '@faker-js/faker'
import axios from 'axios'

type HttpResponseMock = {
  data: object
  status: number
}

export const mockHttpResponse = (): HttpResponseMock => ({
  data: JSON.parse(faker.datatype.json()),
  status: faker.datatype.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockResolvedValue(mockHttpResponse())
  mockedAxios.get.mockResolvedValue(mockHttpResponse())
  return mockedAxios
}
