import { CheckCircleIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Heading, Spacer, VStack, useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { CandidateModule } from '../../api/modules/candidate.module'
import { PageHeading } from '../../components/commons/PageHeading'

export const RegisterPage = () => {
  const toast = useToast()

  const { inviteId } = useParams()
  const { loggedInUser, isLoggedIn } = useAuthContext()
  const navigate = useNavigate()

  const mutation = useMutation(CandidateModule.getInstance().createCandidate, {
    onSuccess: () => {
      navigate(`/`)
    },
    onError: (error) => {
      console.log('Error at createCandidate', JSON.stringify(error))
      toast({
        title: 'Hiba meghívó elfogadásakor',
        description: `${(error as any).message} | Próbálja később.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onClickAcceptInvite = () => {
    if (!inviteId || !loggedInUser?.id) {
      return toast({
        title: 'Hiba meghívó elfogadásakor',
        description: `Nincs bejelentkezve, vagy hibás URL lett megnyitva!`,
        status: 'error',
        isClosable: true
      })
    }
    mutation.mutate({ inviteId: parseInt(inviteId), userId: loggedInUser?.id })
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <PageHeading title="Regisztráció a felvételi rendszerbe" />
      <Box>
        <Heading as="h2" size="md" mb={4}>
          Adataid
        </Heading>
        <Box>
          <VStack spacing={4} align="stretch">
            <Box>E-mail cím: {loggedInUser?.email}</Box>
            <Box>Teljes név: {loggedInUser?.fullName}</Box>
            <Box>Meghívó ID: {inviteId}</Box>
          </VStack>
        </Box>
        <HStack mt={6}>
          <Spacer />
          <Button leftIcon={<CheckCircleIcon />} colorScheme="green" onClick={onClickAcceptInvite}>
            Meghívó elfogadása
          </Button>
        </HStack>
      </Box>
    </>
  )
}
