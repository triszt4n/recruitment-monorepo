import { HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  slug: string
}

export const AdmissionPeriodEntry: React.FC<Props> = ({ title, slug }) => {
  return (
    <HStack my={2} fontSize="lg">
      <Link to={slug}>&#128221; {title} &raquo;</Link>
    </HStack>
  )
}
