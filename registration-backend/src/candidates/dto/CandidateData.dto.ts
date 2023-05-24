import { CandidateEntity } from './CandidateEntity.dto'
import { InviteEntity } from './InviteEntity.dto'
import { PeriodEntity } from './PeriodEntity.dto'

export class CandidateData {
  candidate: CandidateEntity
  invite: InviteEntity
  period: PeriodEntity

  constructor(partial: Partial<CandidateData>) {
    Object.assign(this, partial)
  }
}
