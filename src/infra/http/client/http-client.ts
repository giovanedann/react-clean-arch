import {
  type HttpGetClient,
  type HttpGetParams,
  type HttpPostClient,
  type HttpPostParams,
  type HttpResponse
} from 'data/protocols/http'
import axios, { type AxiosResponse } from 'axios'

export class HttpClient implements HttpPostClient, HttpGetClient<any> {
  private adapt(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data
    }
  }

  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error: any) {
      axiosResponse = error.response
    }

    return this.adapt(axiosResponse)
  }

  async get({ url, headers }: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.get(url, { headers })
    } catch (error: any) {
      axiosResponse = error.response
    }

    return this.adapt(axiosResponse)
  }
}
