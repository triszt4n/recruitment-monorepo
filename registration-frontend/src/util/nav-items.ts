import { environment } from './environment'

export interface INavItem {
  label: string
  path: string
  external: boolean
  onClick: () => void
  shouldBeShown: (isLoggedIn: boolean) => boolean
}

export class NavItem implements INavItem {
  public label: string
  public path: string
  public external: boolean
  public onClick: () => void

  public shouldBeShown = (isLoggedIn: boolean) => isLoggedIn

  constructor({
    label,
    path,
    onClick = () => {},
    external = false
  }: {
    label: string
    path: string
    onClick?: () => void
    external?: boolean
  }) {
    this.label = label
    this.path = path
    this.onClick = onClick
    this.external = external
  }
}

const LoginItem = new NavItem({
  label: 'Belépés',
  path: '/login',
  external: true,
  onClick: () => (window.location.href = `${environment.API_HOST}/auth/login`)
})
LoginItem.shouldBeShown = (isLoggedIn: boolean) => !isLoggedIn

const LogoutItem = new NavItem({
  label: 'Kijelentkezés',
  path: '/logout'
})
LogoutItem.shouldBeShown = (isLoggedIn: boolean) => isLoggedIn

export const NAV_ITEMS: INavItem[] = [LoginItem, LogoutItem]
