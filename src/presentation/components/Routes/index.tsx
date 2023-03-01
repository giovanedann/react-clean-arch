/* istanbul ignore file */

import { FormProvider } from 'presentation/contexts/form'
import SignUp from 'presentation/pages/SignUp'
import { type ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'styles/global.scss'

type RouterProps = {
  loginFactory: () => ReactNode
}

export default function Router({ loginFactory }: RouterProps): JSX.Element {
  return (
    <BrowserRouter>
      <FormProvider>
        <Routes>
          <Route path="/login" element={loginFactory()} />
        </Routes>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </FormProvider>
    </BrowserRouter>
  )
}
