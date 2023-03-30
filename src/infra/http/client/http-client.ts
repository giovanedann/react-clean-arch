import {
  type HttpResponse,
  type HttpClient as HttpClientProtocol,
  type HttpRequest
} from 'data/protocols/http'
import axios, { type AxiosResponse } from 'axios'

export class HttpClient implements HttpClientProtocol<any> {
  private adapt(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data
    }
  }

  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.request({
        method: data.method,
        url: data.url,
        data: data.body,
        headers: data.headers
      })
    } catch (error: any) {
      axiosResponse = error.response
    }

    return this.adapt(axiosResponse)
  }
}
