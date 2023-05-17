import { Box } from '@chakra-ui/react'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { PageHeading } from '../../components/commons/PageHeading'

export const IndexPage = () => {
  const { isLoggedIn, loggedInUser } = useAuthContext()

  return (
    <>
      <PageHeading title="Simonyi Felvételi Admin" />
      <Box>{isLoggedIn ? `${loggedInUser?.email}` : 'Nincs bejelentkezve'}</Box>
    </>
  )
}
