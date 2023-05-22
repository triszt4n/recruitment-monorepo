import { CheckCircleIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Heading, Spacer } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PeriodModule } from '../../api/modules/period.module'
import { PageHeading } from '../../components/commons/PageHeading'
import { AdmissionPeriodEntry } from '../index/components/AdmissionPeriodEntry'

export const PeriodPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: period } = useQuery(['periods', id], () => PeriodModule.getInstance().getPeriod(id!!))
  const { data: invites } = useQuery(['periods', id, 'invites'], () => PeriodModule.getInstance().getInvites(id!!))

  return (
    <>
      <PageHeading title={period?.title || ''} />
      <Box>
        <HStack>
          <Spacer />
          <Button leftIcon={<PlusSquareIcon />} onClick={() => navigate(`/periods/${id}/new-invite`)} colorScheme="green">
            Hozzáadás
          </Button>
        </HStack>
        <Heading as="h2" size="md" mb={4}>
          Még kiküldetlen meghívók
        </Heading>
        <Box>
          {invites
            ?.filter(({ isEmailSent }) => isEmailSent)
            .map(({ id }) => (
              <InviteEntry key={id} title={title} slug={`/periods/${id}`} />
            ))}
        </Box>
        <HStack>
          <Spacer />
          <Button leftIcon={<CheckCircleIcon />} onClick={() => navigate(`/periods/${id}/new-invite`)} colorScheme="green">
            Meghívók kiküldése
          </Button>
        </HStack>
        <Heading as="h2" size="md" mb={4} mt={10}>
          Kiküldött meghívók
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
