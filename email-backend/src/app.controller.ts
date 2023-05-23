import { Body, Controller, Post } from '@nestjs/common'
import { MailingService } from './mailing/mailing.service'
import { InviteEntity } from './types/InviteEntity'

@Controller()
export class AppController {
  constructor(private readonly mailingService: MailingService) {}

  @Post('send-invites')
  async sendInvites(
    @Body() body: { periodTitle: string; invites: InviteEntity[] },
  ): Promise<void> {
    const { invites, periodTitle } = body
    await Promise.all(
      invites.map((invite) => {
        const templateValue = {
          firstName: invite.supposedFirstName,
          periodTitle,
          link: ``,
        }
        const generatedHtml = this.mailingService.generateMail(
          templateValue,
          'candidate',
        )
        return this.mailingService.sendMail({
          to: invite.supposedEmail,
          subject: 'Szakkollégiumi Felvételi',
          html: generatedHtml,
        })
      }),
    )
  }
}
