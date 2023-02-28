import { HttpStatusCode, type HttpPostClient } from 'data/protocols/http'
import { EmailAlreadyInUseError, UnexpectedError } from 'domain/errors'
import { type AccountModel } from 'domain/models'
import { type AddAccountParams, type AddAccount } from 'domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        if (!httpResponse.body) {
          console.log(httpResponse.body)
          throw new UnexpectedError()
        }
        return httpResponse.body

      case HttpStatusCode.forbidden:
        throw new EmailAlreadyInUseError()

      default:
        throw new UnexpectedError()
    }
  }
}
