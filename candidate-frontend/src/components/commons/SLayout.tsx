import { Box, Flex } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'
import { Navbar } from '../navbar'
import { Footer } from './Footer'
import { SContainer } from './SContainer'
import { ScrollToTop } from './ScrollToTop'

type Props = {
  background?: string
}

export const SLayout: FC<PropsWithChildren<Props>> = ({ background, children }) => {
  return (
    <>
      <ScrollToTop />
      <Flex direction="column" minHeight="100vh">
        <Navbar />
        <Box background={background} flex={1} pb={15}>
          <SContainer>{children}</SContainer>
        </Box>
        <Footer />
      </Flex>
    </>
  )
}
