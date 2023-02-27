import {
  type HttpPostClient,
  type HttpPostParams,
  type HttpResponse
} from 'data/protocols/http'
import axios, { type AxiosResponse } from 'axios'

export class HttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>

    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error: any) {
      httpResponse = error.response
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
