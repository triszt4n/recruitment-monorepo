import { Body, Controller, Get, Post } from '@nestjs/common'
import { MailingService } from './mailing/mailing.service'
import { InviteEntity } from './types/InviteEntity'

@Controller()
export class AppController {
  constructor(private readonly mailingService: MailingService) {}

  @Get()
  getHello(): string {
    return "Hello, I'm the backend!"
  }

  @Post('send-invites')
  async sendInvites(
    @Body() body: { periodTitle: string; invites: InviteEntity[] },
  ): Promise<number[]> {
    const { invites, periodTitle } = body
    const successfulEmails = await Promise.all(
      invites.map(async (invite) => {
        const templateValue = {
          firstName: invite.supposedFirstName,
          periodTitle,
          loginLink: `http://localhost:4003/login`,
          registerLink: `http://localhost:4003/register/${invite.id}`,
        }
        const generatedHtml = this.mailingService.generateMail(
          templateValue,
          'candidate',
        )
        const wasSuccessful = await this.mailingService.sendMail({
          to: invite.supposedEmail,
          subject: 'Szakkollégiumi Felvételi',
          html: generatedHtml,
        })
        return wasSuccessful ? invite.id : null
      }),
    )
    return successfulEmails.filter(Boolean)
  }
}
