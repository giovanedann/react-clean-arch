import { HttpPostClient } from 'data/protocols/http/http-post-client'
import { HttpStatusCode } from 'data/protocols/http/http-response'
import { InvalidCredentialsError } from 'domain/errors/invalid-credentials'
import { UnexpectedError } from 'domain/errors/unexpected'
import { AccountModel } from 'domain/models/account'
import { AuthenticationParams, Authentication } from 'domain/usecases/authentication'

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
