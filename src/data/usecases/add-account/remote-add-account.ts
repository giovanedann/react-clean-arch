import { HttpStatusCode, type HttpPostClient } from 'data/protocols/http'
import { EmailAlreadyInUseError, UnexpectedError } from 'domain/errors'
import { type AddAccount } from 'domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
    AddAccount.Params,
    RemoteAddAccount.Model
    >
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
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

      case HttpStatusCode.forbidden:
        throw new EmailAlreadyInUseError()

      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
