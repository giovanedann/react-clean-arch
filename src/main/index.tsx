import { createRoot } from 'react-dom/client'
import Router from 'presentation/components/Routes'
import loginPageFactory from './factories/pages/Login/login-factory'
import signUpPageFactory from './factories/pages/SignUp/sign-up-factory'

const container = document.getElementById('root') as HTMLElement

const root = createRoot(container)

root.render(
  <Router loginFactory={loginPageFactory} signUpFactory={signUpPageFactory} />
)
