import { faker } from '@faker-js/faker'
import { HttpClient } from './http-client'
import axios from 'axios'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('HttpClient', () => {
  it('should call axios with correct URL', async () => {
    const sut = new HttpClient()
    const url = faker.internet.url()
    await sut.post({ url })

    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
