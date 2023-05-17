import { Link } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

type Props = {
  url: string
  hoverColor: string
  centered?: boolean
}

export const ColorfulExternalLink: FC<PropsWithChildren<Props>> = ({ url, hoverColor, children, centered = false }) => {
  return (
    <Link isExternal href={url} _hover={{ color: hoverColor }} textAlign={centered ? 'center' : undefined}>
      {children}
    </Link>
  )
}
