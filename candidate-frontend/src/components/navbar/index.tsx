import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Collapse, Flex, HStack, Heading, IconButton, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export const Navbar: FC = () => {
  const { isOpen, onToggle } = useDisclosure()
  const onNavigate = () => onToggle()

  return (
    <Flex justifyContent="center" w="full" mr={5}>
      <Box mx="auto" maxW="6xl" w="full" color={useColorModeValue('green.500', 'white')}>
        <Flex h="4rem" w="full" px={4} py={2} align="center">
          <Flex display={{ base: 'flex', lg: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon h="1.5rem" /> : <HamburgerIcon h="1.5rem" />}
              variant="ghost"
              aria-label="Open navigation"
            />
          </Flex>
          <Heading as={Link} to="/" _hover={{ textDecoration: 'none' }} flex={{ base: 1, lg: 0 }} textAlign="center">
            SimonyiAdmin
          </Heading>
          <Flex display={{ base: 'none', lg: 'flex' }} flex={1} justifyContent="end">
            <DesktopNav />
          </Flex>
          <HStack ml={{ base: 0, md: 6 }}>
            <ColorModeSwitcher />
          </HStack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav onNavigate={onNavigate} />
        </Collapse>
      </Box>
    </Flex>
  )
}
