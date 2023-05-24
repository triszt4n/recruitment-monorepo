import { Box, Heading, useToast } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { CandidateData } from '../../api/model/candidate.model'
import { CandidateModule } from '../../api/modules/candidate.module'
import { PageHeading } from '../../components/commons/PageHeading'
import { CandidateEntry } from './components/CandidateEntry'

export const IndexPage = () => {
  const { isLoggedIn, loggedInUser } = useAuthContext()
  const navigate = useNavigate()
  const toast = useToast()

  const { data: candidates } = useQuery(
    ['candidates', loggedInUser?.id],
    () => CandidateModule.getInstance().getCandidatesOfUser(loggedInUser!!.id),
    { enabled: isLoggedIn }
  )

  const onClickEdit = (data: CandidateData) => {
    navigate(`/candidates/${data.candidate.id}/edit`, { state: { data } })
  }

  if (!isLoggedIn) {
    return (
      <>
        <PageHeading title="Simonyi Felvételi Jelentkeztető" />
        <Box>Kérlek, jelentkezz be a további funkcionalitások eléréséért.</Box>
      </>
    )
  }

  return (
    <>
      <PageHeading title="Simonyi Felvételi Jelentkeztető" />
      <Heading as="h1" size="lg" mb={2}>
        Jelentkezéseid
      </Heading>
      <Heading as="h2" size="md" mb={4}>
        Üdv, {loggedInUser?.fullName} ({loggedInUser?.email})
      </Heading>
      <Box>
        {candidates?.map(({ id, inviteId }) => (
          <CandidateEntry key={id} inviteId={inviteId} id={id} onClickEdit={onClickEdit} />
        ))}
      </Box>
    </>
  )
}
