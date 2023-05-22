import { PlusSquareIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Heading, Spacer, Spinner, VStack, useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { PeriodModule } from '../../api/modules/period.module'
import { PageHeading } from '../../components/commons/PageHeading'
import { AdmissionPeriodEntry } from './components/AdmissionPeriodEntry'

export const IndexPage = () => {
  const { isLoggedIn } = useAuthContext()
  const navigate = useNavigate()
  const toast = useToast()
  const { data: periods, error, isLoading } = useQuery(['periods'], PeriodModule.getInstance().getPeriods, { enabled: isLoggedIn })

  useEffect(() => {
    if (error && (error as AxiosError).code?.includes('ERR_NETWORK')) {
      toast({
        title: 'Hálózati hiba',
        description: `Nincs kapcsolat a kiszolgáló felé.`,
        status: 'error',
        isClosable: true
      })
    }
  }, [error])

  if (isLoading) {
    return (
      <VStack>
        <Spinner size="xl" />
      </VStack>
    )
  }

  if (!isLoggedIn) {
    return (
      <>
        <PageHeading title="Simonyi Felvételi Admin" />
        <Box>Kérlek, jelentkezz be a további funkcionalitások eléréséért.</Box>
      </>
    )
  }

  return (
    <>
      <PageHeading title="Simonyi Felvételi Admin" />
      <Box>
        <HStack>
          <Spacer />
          <Button leftIcon={<PlusSquareIcon />} onClick={() => navigate('/periods/new')} colorScheme="green">
            Új időszak
          </Button>
        </HStack>
        <Heading as="h2" size="md" mb={4}>
          Aktív felvételi időszak(ok)
        </Heading>
        <Box>
          {periods
            ?.filter(({ isActive }) => isActive)
            .map(({ title, id }) => (
              <AdmissionPeriodEntry key={id} title={title} slug={`/periods/${id}`} />
            ))}
        </Box>
        <Heading as="h2" size="md" mb={4} mt={10}>
          Korábbi felvételi időszakok
        </Heading>
        <Box>
          {periods
            ?.filter(({ isActive }) => !isActive)
            .map(({ title, id }) => (
              <AdmissionPeriodEntry key={id} title={title} slug={`/periods/${id}`} />
            ))}
        </Box>
      </Box>
    </>
  )
}
