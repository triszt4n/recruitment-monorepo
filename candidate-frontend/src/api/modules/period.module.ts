import axios from 'axios'
import { CreateInviteDto, InviteModel } from '../model/invite.model'
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

  async createInvite(data: { periodId: string; dto: CreateInviteDto }) {
    const response = await axios.post<InviteModel>(`/periods/${data.periodId}/invites`, data.dto)
    return response.data
  }

  async sendInvites(periodId: string) {
    const response = await axios.post(`/periods/${periodId}/invites/send`)
    return response.data
  }
}
