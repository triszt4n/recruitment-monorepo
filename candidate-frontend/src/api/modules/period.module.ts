import axios from 'axios'
import { InviteModel } from '../model/invite.model'
import { PeriodModel } from '../model/period.model'

export class PeriodModule {
  private static instance: PeriodModule
  private constructor() {}

  static getInstance() {
    if (!PeriodModule.instance) {
      PeriodModule.instance = new PeriodModule()
    }
    return PeriodModule.instance
  }

  async getPeriods() {
    const response = await axios.get<PeriodModel[]>('/periods')
    return response.data
  }

  async getPeriod(id: string) {
    const response = await axios.get<PeriodModel>(`/periods/${id}`)
    return response.data
  }

  async createPeriod(title: string) {
    const response = await axios.post<PeriodModel>(`/periods`, { title })
    return response.data
  }

  async getInvites(periodId: string) {
    const response = await axios.get<InviteModel[]>(`/periods/${periodId}/invites`)
    return response.data
  }
}
