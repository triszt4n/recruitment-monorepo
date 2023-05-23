import { Checkbox, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { InviteModel } from '../../../api/model/invite.model'

type Props = {
  invites: InviteModel[]
}

export const InvitationTable: React.FC<Props> = ({ invites }) => {
  return (
    <TableContainer>
      <Table colorScheme="green">
        <Thead>
          <Tr>
            <Th>Név</Th>
            <Th>Email</Th>
            <Th textAlign="center">Szóbeli</Th>
            <Th textAlign="center">Írásbeli</Th>
          </Tr>
        </Thead>
        <Tbody>
          {invites.map((invite) => (
            <Tr key={invite.id}>
              <Td>
                {invite.supposedLastName} {invite.supposedFirstName}
              </Td>
              <Td>{invite.supposedEmail}</Td>
              <Td textAlign="center">
                <Checkbox colorScheme="green" isChecked={invite.needsOralExam} />
              </Td>
              <Td textAlign="center">{invite.communities.length > 0 ? invite.communities.join(', ') : '-'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
