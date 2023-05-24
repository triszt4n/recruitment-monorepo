import axios from 'axios'
import { CandidateData, CandidateModel, CreateCandidateDto, UpdateCandidateDto } from '../model/candidate.model'

export class CandidateModule {
  private static instance: CandidateModule
  private constructor() {}

  static getInstance() {
    if (!CandidateModule.instance) {
      CandidateModule.instance = new CandidateModule()
    }
    return CandidateModule.instance
  }

  async getCandidatesOfUser(userId: number) {
    const response = await axios.get<CandidateModel[]>(`/candidates/user/${userId}`)
    return response.data
  }

  async getCandidateData(id: number) {
    const response = await axios.get<CandidateData>(`/candidates/${id}/data`)
    return response.data
  }

  async createCandidate(data: CreateCandidateDto) {
    const response = await axios.post<CandidateModel>(`/candidates`, data)
    return response.data
  }

  async updateCandidate(data: { id: number; dto: UpdateCandidateDto }) {
    const response = await axios.patch<CandidateModel>(`/candidates/${data.id}`, data.dto)
    return response.data
  }
}
