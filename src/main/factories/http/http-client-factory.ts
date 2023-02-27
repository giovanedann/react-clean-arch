import { HttpClient } from 'infra/http/client/http-client'

export default function httpClientFactory(): HttpClient {
  return new HttpClient()
}
