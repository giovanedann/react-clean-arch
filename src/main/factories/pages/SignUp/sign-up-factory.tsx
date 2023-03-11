import remoteAddAccountFactory from 'main/factories/usecases/add-account/remote-add-account-factory'
import SignUp from 'presentation/pages/SignUp'
import signUpValidationFactory from './sign-up-validation-factory'

export default function signUpPageFactory(): JSX.Element {
  return (
    <SignUp
      addAccount={remoteAddAccountFactory()}
      validation={signUpValidationFactory()}
    />
  )
}
