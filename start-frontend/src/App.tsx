import { CheckCircleIcon } from '@chakra-ui/icons'
import { Box, Container, Flex, Heading, Link, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import './global.css'
import { environment } from './util/environment'

export const App = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Box flex={1} pb={15}>
        <Container>
          <Heading as="h1" size="2xl" textAlign="center" mt={10} mb={5}>
            Simonyi felvételi és minőségbiztosítás
          </Heading>
          <Heading as="h2" size="lg" textAlign="center" mb={10}>
            Startlap
          </Heading>
          <List fontSize="md" spacing={2}>
            {environment.urls.map(({ name, url }) => (
              <ListItem key={url}>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Link href={url}>{name}</Link>
              </ListItem>
            ))}
          </List>
        </Container>
      </Box>
      <Box textAlign="center" my={10}>
        <Text fontSize="sm" mt={36}>
          Simonyi Károly Szakkollégium &copy; {new Date().getFullYear()}
        </Text>
      </Box>
    </Flex>
  )
}
