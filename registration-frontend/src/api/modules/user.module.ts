import axios from 'axios'
import { UserModel } from '../model/user.model'

export class UserModule {
  private static instance: UserModule
  private constructor() {}

  static getInstance() {
    if (!UserModule.instance) {
      UserModule.instance = new UserModule()
    }
    return UserModule.instance
  }

  async fetchCurrentUser() {
    const response = await axios.get<UserModel & { jwt?: string }>('/users/profile')
    return response.data
  }

  async loginUser(accessToken: string) {
    return axios.post<{ jwt: string }>(`/auth/login`, { accessToken })
  }
}
