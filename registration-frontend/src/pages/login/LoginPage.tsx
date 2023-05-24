import { UnlockIcon } from '@chakra-ui/icons'
import { Button, Text, VStack } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'

export const LoginPage = () => {
  const { isLoggedIn, onLoginStarted } = useAuthContext()

  if (isLoggedIn) return <Navigate replace to="/" />

  return (
    <>
      <VStack alignItems="center" spacing={6}>
        <Text fontSize="xl" fontWeight={700}>
          Jelentkezz be AuthSCH-n keresztül
        </Text>
        <Button leftIcon={<UnlockIcon />} colorScheme="green" onClick={onLoginStarted}>
          AuthSCH bejelentkezés
        </Button>
      </VStack>
    </>
  )
}
