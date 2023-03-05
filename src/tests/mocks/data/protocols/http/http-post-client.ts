import { faker } from '@faker-js/faker'
import { type HttpPostParams } from 'data/protocols/http'

export function mockPostRequest(): HttpPostParams {
  const randomObject = JSON.parse(faker.datatype.json())

  return {
    url: faker.internet.url(),
    body: randomObject
  }
}
