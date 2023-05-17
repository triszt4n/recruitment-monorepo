import { Route, Routes } from 'react-router-dom'
import { SLayout } from './components/commons/SLayout'
import './global.css'
import { AuthorizedPage } from './pages/authorized/AuthorizedPage'
import { ErrorPage } from './pages/error/ErrorPage'
import { IndexPage } from './pages/index/IndexPage'
import { LoginPage } from './pages/login/LoginPage'
import { LogoutPage } from './pages/logout/LogoutPage'

export const App = () => {
  return (
    <SLayout>
      <Routes>
        <Route path="/">
          <Route index element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="authorized" element={<AuthorizedPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="error" element={<ErrorPage />} />
          <Route
            path="*"
            element={<ErrorPage title="Az oldal nem található" messages={['Hupsz, olyan oldalra kerültél, ami nem létezik!']} />}
          />
        </Route>
      </Routes>
    </SLayout>
  )
}
