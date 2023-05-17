import {
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorator/current-user.decorator'
import { JwtAuth } from 'src/auth/decorator/jwtAuth.decorator'
import { ApiController } from 'src/utils/apiController.decorator'
import { UserEntity } from './dto/UserEntity.dto'
import { UserProfileDto } from './dto/UserProfile.dto'
import { UsersService } from './users.service'

@JwtAuth()
@ApiController('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  findProfile(@CurrentUser() user: UserEntity): Promise<UserProfileDto> {
    return this.usersService.profile(user)
  }

  @Post(':id/promote')
  async promote(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    try {
      return await this.usersService.promoteUser(id)
    } catch {
      throw new NotFoundException('A felhasználó nem található!')
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    try {
      return await this.usersService.remove(id)
    } catch {
      throw new NotFoundException('A felhasználó nem található!')
    }
  }
}
