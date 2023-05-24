import { Link as ChakraLink, LinkProps, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type Props = {
  isExternal?: boolean
  to: string
} & LinkProps

export const SLink: FC<Props> = ({ isExternal, to, children, ...props }) => {
  const Component = (
    <ChakraLink as="span" color={useColorModeValue('green.500', 'green.300')} {...props}>
      {children}
    </ChakraLink>
  )

  return isExternal ? (
    <a href={to} target="_blank" rel="noreferrer">
      {Component}
    </a>
  ) : (
    <RouterLink to={to}>{Component}</RouterLink>
  )
}
