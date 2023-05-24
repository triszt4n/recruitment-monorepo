import { EditIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Spinner } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { CandidateData } from '../../../api/model/candidate.model'
import { CandidateModule } from '../../../api/modules/candidate.module'

type Props = {
  id: number
  inviteId: number
  onClickEdit: (data: CandidateData) => void
}

export const CandidateEntry: React.FC<Props> = ({ id, inviteId, onClickEdit }) => {
  const { data, isLoading } = useQuery(['candidateData', id], () => CandidateModule.getInstance().getCandidateData(id))

  return (
    <HStack my={2} fontSize="lg" justifyContent="space-between" flexWrap="wrap">
      <Box py={1}>&#127919; Meghívó ID: {inviteId}</Box>
      {isLoading ? (
        <Box py={1}>
          <Spinner />
        </Box>
      ) : (
        <>
          {' '}
          <Box py={1}>Időszak: {data?.period.title}</Box>
          <Button colorScheme="green" leftIcon={<EditIcon />} onClick={() => onClickEdit(data!!)}>
            Jelentkezési űrlap
          </Button>
        </>
      )}
    </HStack>
  )
}
