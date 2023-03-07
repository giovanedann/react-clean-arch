/* istanbul ignore file */

import loginPageFactory from 'main/factories/pages/Login/login-factory'
import signUpPageFactory from 'main/factories/pages/SignUp/sign-up-factory'
import { ApiProvider } from 'presentation/contexts/api'
import { FormProvider } from 'presentation/contexts/form'
import SurveyList from 'presentation/pages/SurveyList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'styles/global.scss'

export default function Router(): JSX.Element {
  return (
    <ApiProvider>
      <BrowserRouter>
        <FormProvider>
          <Routes>
            <Route path="/" element={<SurveyList />} />
            <Route path="/login" element={loginPageFactory()} />
            <Route path="/sign-up" element={signUpPageFactory()} />
          </Routes>
        </FormProvider>
      </BrowserRouter>
    </ApiProvider>
  )
}
