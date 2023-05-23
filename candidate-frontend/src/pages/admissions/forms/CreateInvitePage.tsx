import { Box, Heading, Text, useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { CreateInviteDto } from '../../../api/model/invite.model'
import { PeriodModule } from '../../../api/modules/period.module'
import { InviteForm } from './InviteForm'

export const CreateInvitePage = () => {
  const { state } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  const toast = useToast()
  const { isLoggedIn } = useAuthContext()
  const mutation = useMutation(PeriodModule.getInstance().createInvite, {
    onSuccess: ({ periodId }) => {
      navigate(`/periods/${periodId}`)
    },
    onError: (error) => {
      console.log('Error at createInvite', JSON.stringify(error))
      toast({
        title: 'Hiba meghívó létrehozásakor',
        description: `${(error as any).message} | Próbálja később.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onSend = async (dto: CreateInviteDto) => {
    mutation.mutate({ periodId: id!!, dto })
  }

  if (!isLoggedIn) {
    return (
      <Navigate
        replace
        to="/error"
        state={{
          title: 'Nincs bejelentkezve'
        }}
      />
    )
  }

  return (
    <Box>
      <Heading mb={4}>Meghívó létrehozása</Heading>
      <Text mb={10} fontSize="sm">
        Időszak: {state['periodName']}
      </Text>
      <InviteForm onSend={onSend} sendButtonText="Létrehozás" isSendLoading={mutation.isLoading} />
    </Box>
  )
}
