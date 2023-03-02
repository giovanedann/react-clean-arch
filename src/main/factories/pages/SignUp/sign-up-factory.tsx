import remoteAddAccountFactory from 'main/factories/usecases/add-account/remote-add-account-factory'
import localSaveAccessTokenFactory from 'main/factories/usecases/save-access-token/save-access-token-factory'
import SignUp from 'presentation/pages/SignUp'
import signUpValidationFactory from './sign-up-validation-factory'

export default function signUpPageFactory(): JSX.Element {
  return (
    <SignUp
      addAccount={remoteAddAccountFactory()}
      validation={signUpValidationFactory()}
      saveAccessToken={localSaveAccessTokenFactory()}
    />
  )
}
