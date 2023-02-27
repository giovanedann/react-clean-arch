import RemoteAuthentication from 'data/usecases/authentication/remote-authentication'
import { HttpClient } from 'infra/http/client/http-client'
import Login from 'presentation/pages/Login'
import { ValidationBuilder, ValidationComposite } from 'validation/validators'

export default function loginPageFactory(): JSX.Element {
  const url = 'http://localhost:5050/api/login'
  const httpClient = new HttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, httpClient)

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build()
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
