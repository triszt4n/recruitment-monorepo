import { UserModel } from './user.model'

export interface PeriodModel {
  id: number
  title: string
  createdBy: UserModel
  isActive: boolean
}
