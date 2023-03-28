/* istanbul ignore file */

import loginPageFactory from 'main/factories/pages/Login/login-factory'
import signUpPageFactory from 'main/factories/pages/SignUp/sign-up-factory'
import surveyListPageFactory from 'main/factories/pages/SurveyList/survey-list-factory'
import surveyResultPageFactory from 'main/factories/pages/SurveyResult/survey-result-factory'
import { ApiProvider } from 'presentation/contexts/api'
import { FormProvider } from 'presentation/contexts/form'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'styles/global.scss'
import PrivateRoute from './PrivateRoute'

export default function Router(): JSX.Element {
  return (
    <ApiProvider>
      <BrowserRouter>
        <FormProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={surveyListPageFactory()} />
              <Route path="/surveys/:id" element={surveyResultPageFactory()} />
            </Route>
            <Route path="/login" element={loginPageFactory()} />
            <Route path="/sign-up" element={signUpPageFactory()} />
          </Routes>
        </FormProvider>
      </BrowserRouter>
    </ApiProvider>
  )
}
