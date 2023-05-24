import { Flex } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

export const SContainer: FC<PropsWithChildren> = ({ children }) => (
  <Flex flexDirection="column" px={4} py={4} mx="auto" maxWidth={['100%', '48rem', '48rem', '64rem']}>
    {children}
  </Flex>
)
