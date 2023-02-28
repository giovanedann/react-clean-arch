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
        return { accessToken: '' }

      case HttpStatusCode.forbidden:
        throw new EmailAlreadyInUseError()

      default:
        throw new UnexpectedError()
    }
  }
}
