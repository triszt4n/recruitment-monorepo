import Cookies from 'js-cookie'
import { createContext, FC, PropsWithChildren, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { environment } from '../../../util/environment'
import { queryClient } from '../../../util/query-client'
import { UserModel } from '../../model/user.model'
import { UserModule } from '../../modules/user.module'
import { CookieKeys } from '../CookieKeys'

export type AuthContextType = {
  isLoggedIn: boolean
  loggedInUser: UserModel | undefined
  loggedInUserLoading: boolean
  loggedInUserError: unknown
  onLoginSuccess: (jwt: string) => void
  onLoginStarted: () => void
  onLogout: (path?: string) => void
  refetchUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loggedInUser: undefined,
  loggedInUserLoading: false,
  loggedInUserError: undefined,
  onLoginSuccess: () => {},
  onLoginStarted: () => {},
  onLogout: () => {},
  refetchUser: async () => {}
})

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(typeof Cookies.get(CookieKeys.REGISTER_JWT_TOKEN) !== 'undefined')
  const {
    isLoading,
    data: user,
    error
  } = useQuery('currentUser', UserModule.getInstance().fetchCurrentUser, {
    enabled: isLoggedIn,
    retry: false,
    onSuccess: (data) => {
      if (data.jwt) {
        Cookies.set(CookieKeys.REGISTER_JWT_TOKEN, data.jwt, { expires: 2 })
      }
    }
  })

  const onLoginSuccess = (jwt: string) => {
    Cookies.set(CookieKeys.REGISTER_JWT_TOKEN, jwt, { expires: 2 })
    setIsLoggedIn(true)
    queryClient.invalidateQueries('currentUser')
  }

  const onLoginStarted = () => {
    window.location.href = `${environment.API_HOST}/auth/login`
  }

  const onLogout = (path: string = '/') => {
    Cookies.remove(CookieKeys.REGISTER_JWT_TOKEN)
    setIsLoggedIn(false)
    queryClient.invalidateQueries('currentUser')
    navigate(path, { replace: true })
  }

  const refetchUser = async () => {
    return queryClient.invalidateQueries('currentUser')
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedInUserLoading: isLoading,
        loggedInUser: user,
        loggedInUserError: error,
        onLoginSuccess,
        onLoginStarted,
        onLogout,
        refetchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
