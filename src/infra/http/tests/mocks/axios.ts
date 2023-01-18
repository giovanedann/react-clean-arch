import { faker } from '@faker-js/faker'
import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  const mockedAxiosResolvedValue = {
    data: JSON.parse(faker.datatype.json()),
    status: faker.datatype.number()
  }

  mockedAxios.post.mockResolvedValue(mockedAxiosResolvedValue)
  return mockedAxios
}
