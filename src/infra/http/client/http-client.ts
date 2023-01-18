import { HttpPostParams } from 'data/protocols/http'
import axios from 'axios'

export class HttpClient {
  async post (params: HttpPostParams<any>): Promise<void> {
    await axios.post(params.url)
  }
}
