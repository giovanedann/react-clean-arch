/* istanbul ignore file */

import { FormProvider } from 'presentation/contexts/form'
import { ReactNode } from 'react'
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
      </FormProvider>
    </BrowserRouter>
  )
}
