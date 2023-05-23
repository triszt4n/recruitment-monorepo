export class InviteEntity {
  id: number
  supposedEmail: string
  supposedLastName: string
  supposedFirstName: string
  communities: string[]
  needsOralExam?: boolean
  isEmailSent?: boolean
}
