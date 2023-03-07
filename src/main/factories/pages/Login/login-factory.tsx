import remoteAuthenticationFactory from 'main/factories/usecases/authentication/remote-authentication-factory'
import Login from 'presentation/pages/Login'
import loginValidationFactory from './login-validation-factory'

export default function loginPageFactory(): JSX.Element {
  return (
    <Login
      authentication={remoteAuthenticationFactory()}
      validation={loginValidationFactory()}
    />
  )
}
