import { Box, Container, Flex, HStack, Image, Link } from '@chakra-ui/react'
import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <Box as="footer">
      <Container py={8} as={Flex} align="center" justifyContent="space-evenly" direction={{ base: 'column', m: 'row' }} maxW="6xl">
        <HStack justify="center" spacing={{ base: 0, m: 5 }} mb={{ base: 12, m: 0 }}>
          <Link href="https://simonyi.bme.hu/" isExternal>
            <Image pl={['1rem', 0]} src="/img/simonyi-logo.svg" maxW={40} maxH={40} />
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}
