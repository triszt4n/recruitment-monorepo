import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return `Simonyi Felveteli Admin REST API ${
      process.env.npm_package_version
        ? 'v' + process.env.npm_package_version
        : 'in Development mode'
    }`
  }
}
