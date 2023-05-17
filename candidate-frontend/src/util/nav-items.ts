import { UserModel } from '../api/model/user.model'
import { environment } from './environment'

export interface INavItem {
  label: string
  path: string
  external: boolean
  onClick: () => void
  shouldBeShown: (isLoggedIn: boolean, loggedInUser: UserModel | undefined) => boolean
}

export class NavItem implements INavItem {
  public label: string
  public path: string
  public external: boolean
  public onClick: () => void

  public shouldBeShown = (isLoggedIn: boolean, _loggedInUser: UserModel | undefined) => isLoggedIn

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

const HomeItem = new NavItem({
  label: 'Kezdőlap',
  path: '/'
})
HomeItem.shouldBeShown = (_isLoggedIn: boolean) => true

const LoginItem = new NavItem({
  label: 'Belépés',
  path: '/login',
  external: true,
  onClick: () => (window.location.href = `${environment.API_HOST}/auth/login`)
})
LoginItem.shouldBeShown = (isLoggedIn: boolean) => !isLoggedIn

export const NAV_ITEMS: INavItem[] = [HomeItem, LoginItem]
