import { Get, Redirect, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ApiController } from 'src/utils/apiController.decorator'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorator/currentUser.decorator'
import { JwtAuth } from './decorator/jwtAuth.decorator'
import { JwtUserDto } from './dto/JwtUser.dto'

@ApiController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  /**
   * Redirects to the authsch login page
   */
  @UseGuards(AuthGuard('authsch'))
  @Get('login')
  login() {
    // never called
  }
  /**
   * Endpoint for authsch to call after login
   *
   * Redirects to the frontend with the jwt token
   */
  @Get('callback')
  @UseGuards(AuthGuard('authsch'))
  @Redirect()
  oauthRedirect(@CurrentUser() user: User) {
    const { jwt } = this.authService.login(user)
    return {
      url: `${process.env.FRONTEND_AUTHORIZED_URL}?jwt=${jwt}`,
    }
  }
  /**
   * Endpoint for jwt token validation
   */
  @Get('me')
  @JwtAuth()
  me(@CurrentUser() user: JwtUserDto): JwtUserDto {
    return user
  }
}
