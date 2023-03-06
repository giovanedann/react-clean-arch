/* istanbul ignore file */

import { FormProvider } from 'presentation/contexts/form'
import SurveyList from 'presentation/pages/SurveyList'
import { type ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'styles/global.scss'

type RouterProps = {
  loginFactory: () => ReactNode
  signUpFactory: () => ReactNode
}

export default function Router({
  loginFactory,
  signUpFactory
}: RouterProps): JSX.Element {
  return (
    <BrowserRouter>
      <FormProvider>
        <Routes>
          <Route path="/" element={<SurveyList />} />
          <Route path="/login" element={loginFactory()} />
          <Route path="/sign-up" element={signUpFactory()} />
        </Routes>
      </FormProvider>
    </BrowserRouter>
  )
}
