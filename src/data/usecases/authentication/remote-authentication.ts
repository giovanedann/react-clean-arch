import { type HttpPostClient, HttpStatusCode } from 'data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from 'domain/errors'
import { type AccountModel } from 'domain/models'
import { type AuthenticationParams, type Authentication } from 'domain/usecases'

export default class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
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
