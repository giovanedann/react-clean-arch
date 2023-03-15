import { type HttpPostClient, HttpStatusCode } from 'data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from 'domain/errors'
import { type Authentication } from 'domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<Authentication.Params, Authentication.Model>
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (!httpResponse.body) {
          throw new UnexpectedError()
        }

        return httpResponse.body

      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()

      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model
}
