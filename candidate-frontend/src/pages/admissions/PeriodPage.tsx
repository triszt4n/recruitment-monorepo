import { CheckCircleIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Heading, Spacer, Spinner, Text, VStack, useToast } from '@chakra-ui/react'
import { useRef } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PeriodModule } from '../../api/modules/period.module'
import { ConfirmDialogButton } from '../../components/commons/ConfirmDialogButton'
import { PageHeading } from '../../components/commons/PageHeading'
import { queryClient } from '../../util/query-client'
import { InvitationTable } from './components/InvitationTable'

export const PeriodPage = () => {
  const toast = useToast()

  const { id: periodId } = useParams()
  const navigate = useNavigate()
  const { data: period, isLoading: isLoading1 } = useQuery(['periods', periodId], () => PeriodModule.getInstance().getPeriod(periodId!!))
  const { data: invites, isLoading: isLoading2 } = useQuery(['periods', periodId, 'invites'], () =>
    PeriodModule.getInstance().getInvites(periodId!!)
  )

  const sendEmailsButtonRef = useRef<HTMLButtonElement>(null)
  const onClickSendInvites = () => {
    toast({
      title: 'Meghívók kiküldése',
      description: `Emailek küldés alatt...`,
      status: 'info',
      isClosable: true
    })
    PeriodModule.getInstance()
      .sendInvites(periodId!!)
      .then((invites) => {
        toast({
          title: 'Meghívók kiküldése',
          description: `Sikeresen kiküldve ${invites!!.length} meghívó.`,
          status: 'success',
          isClosable: true
        })
        queryClient.invalidateQueries(['periods', periodId, 'invites'])
      })
  }

  if (isLoading1 || isLoading2) {
    return (
      <VStack>
        <Spinner size="xl" />
      </VStack>
    )
  }

  return (
    <>
      <PageHeading title={period?.title || ''} />
      <Box>
        <HStack>
          <Spacer />
          <Button
            leftIcon={<PlusSquareIcon />}
            onClick={() => navigate(`/periods/${periodId}/new-invite`, { state: { periodName: period?.title } })}
            colorScheme="green"
          >
            Új meghívó
          </Button>
        </HStack>
        <Heading as="h2" size="md" mb={4}>
          Még kiküldetlen meghívók
        </Heading>
        <Text fontSize="xs" mb={4}>
          A meghívásra kijelölt személyek a kiküldés során emailben kapnak egy linket, amelyen keresztül beléphetnek a felvételi rendszerbe.
        </Text>
        <Box>
          <InvitationTable invites={invites!!.filter(({ isEmailSent }) => !isEmailSent)} />
        </Box>
        {invites?.some(({ isEmailSent }) => !isEmailSent) && (
          <HStack mt={6}>
            <Spacer />
            <ConfirmDialogButton
              headerText="Meghívók kiküldése"
              bodyText="Ezáltal az akció által a listában szereplő email címekre megkapják a felvételizők a meghívójukat. Folytatja?"
              initiatorButton={
                <Button leftIcon={<CheckCircleIcon />} ref={sendEmailsButtonRef} colorScheme="green">
                  Meghívók kiküldése
                </Button>
              }
              buttonColorScheme="green"
              initiatorButtonRef={sendEmailsButtonRef}
              confirmAction={onClickSendInvites}
            />
          </HStack>
        )}
        <Heading as="h2" size="md" mb={4} mt={10}>
          Kiküldött meghívók
        </Heading>
        <Box>
          <InvitationTable invites={invites!!.filter(({ isEmailSent }) => isEmailSent)} />
        </Box>
      </Box>
    </>
  )
}
