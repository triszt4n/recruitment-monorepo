import { Box, Heading, useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { PeriodModule } from '../../../api/modules/period.module'
import { PeriodForm } from './PeriodForm'

export const CreatePeriodPage = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { isLoggedIn } = useAuthContext()
  const mutation = useMutation(PeriodModule.getInstance().createPeriod, {
    onSuccess: ({ id }) => {
      navigate(`/periods/${id}`)
    },
    onError: (error) => {
      const err = error as AxiosError
      console.log('Error at createPeriod', JSON.stringify(err))
      toast({
        title: 'Hiba időszakkészítéskor',
        description: `${err.response?.status} | Próbálja később.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onSend = async (title: string) => {
    mutation.mutate(title)
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
      <Heading mb={10}>Felvételi időszak létrehozása</Heading>
      <PeriodForm onSend={onSend} sendButtonText="Létrehozás" isSendLoading={mutation.isLoading} />
    </Box>
  )
}
