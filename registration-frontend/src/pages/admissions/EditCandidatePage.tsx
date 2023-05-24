import { Box, Heading, Text, useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { CandidateData, UpdateCandidateDto } from '../../api/model/candidate.model'
import { CandidateModule } from '../../api/modules/candidate.module'
import { CandidateForm } from './CandidateForm'

export const EditCandidatePage = () => {
  const { state } = useLocation() as { state: { data: CandidateData } }
  const { candidateId } = useParams()
  const navigate = useNavigate()

  const toast = useToast()
  const { isLoggedIn } = useAuthContext()
  const mutation = useMutation(CandidateModule.getInstance().updateCandidate, {
    onSuccess: () => {
      navigate(`/`)
    },
    onError: (error) => {
      console.log('Error at updateCandidate', JSON.stringify(error))
      toast({
        title: 'Hiba jelentkezési űrlap mentésekor',
        description: `${(error as any).message} | Próbálja később.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onSend = async (dto: UpdateCandidateDto) => {
    mutation.mutate({ id: parseInt(candidateId!!), dto })
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
      <Heading mb={4}>Jelentkezési űrlap szerkesztése</Heading>
      <Text mb={10} fontSize="sm">
        Időszak: {state.data.period.title}
      </Text>
      <CandidateForm onSend={onSend} data={state.data} sendButtonText="Mentés" isSendLoading={mutation.isLoading} />
    </Box>
  )
}
