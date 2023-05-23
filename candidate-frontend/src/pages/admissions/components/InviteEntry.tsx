import { DeleteIcon } from '@chakra-ui/icons'
import { Avatar, Box, HStack, IconButton } from '@chakra-ui/react'

type Props = {
  periodId: string
  name: string
  email: string
  communities: string[]
}

export const InviteEntry: React.FC<Props> = ({ periodId, name, email, communities }) => {
  return (
    <HStack my={2} fontSize="lg">
      <Avatar size="sm" name={name} />
      <Box>{name}</Box>
      <Box>{email}</Box>
      <IconButton aria-label="Törlés" icon={<DeleteIcon />} onClick={() => {}} />
    </HStack>
  )
}
