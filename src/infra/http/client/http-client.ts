import {
  type HttpPostClient,
  type HttpPostParams,
  type HttpResponse
} from 'data/protocols/http'
import axios, { type AxiosResponse } from 'axios'

export class HttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error: any) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
