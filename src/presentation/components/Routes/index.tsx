import Login from 'presentation/pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'styles/global.scss'

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
