/* istanbul ignore file */

import loginPageFactory from 'main/factories/pages/Login/login-factory'
import signUpPageFactory from 'main/factories/pages/SignUp/sign-up-factory'
import surveyListPageFactory from 'main/factories/pages/SurveyList/survey-list-factory'
import { ApiProvider } from 'presentation/contexts/api'
import { FormProvider } from 'presentation/contexts/form'
import SurveyResult from 'presentation/pages/SurveyResult'
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
              <Route path="/surveys" element={<SurveyResult />} />
            </Route>
            <Route path="/login" element={loginPageFactory()} />
            <Route path="/sign-up" element={signUpPageFactory()} />
          </Routes>
        </FormProvider>
      </BrowserRouter>
    </ApiProvider>
  )
}
