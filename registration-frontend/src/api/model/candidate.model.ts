import { InviteModel } from './invite.model'
import { PeriodModel } from './period.model'

export interface CreateCandidateDto {
  userId: number
  inviteId: number
}

export interface UpdateCandidateDto {
  phoneNumber: string
  nickName?: string
  dormRoom?: string
  neptunCode: string
  universityFaculty: string
  programmeName: string
  programmeLevel: string
  programmeStartSemester: string
}

export interface CandidateModel extends UpdateCandidateDto {
  id: number
  inviteId: number
  userId: number
}

export interface CandidateData {
  candidate: CandidateModel
  invite: InviteModel
  period: PeriodModel
}
