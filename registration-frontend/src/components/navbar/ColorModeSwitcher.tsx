import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'
type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeSwitcher: FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)

  return (
    <IconButton
      size="md"
      fontSize={{ base: 'xl', md: '2xl' }}
      variant="ghost"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      color={useColorModeValue('green.500', 'white')}
      {...props}
    />
  )
}
