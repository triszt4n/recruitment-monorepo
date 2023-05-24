export type CommunityString = 'ac' | 'bss' | 'lego' | 'ha5kfu' | 'kirdev' | 'mgmt' | 'sem' | 'spot' | 'schdesign'

export interface InviteModel {
  id: number
  periodId: number
  supposedEmail: string
  supposedFirstName: string
  supposedLastName: string
  needsOralExam: boolean
  isEmailSent: boolean
  communities: CommunityString[]
}
