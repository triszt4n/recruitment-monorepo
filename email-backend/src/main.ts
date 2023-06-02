import 'dotenv/config'

import { DaprServer } from '@dapr/dapr'
import { MailingService } from './mailing.service'

const DAPR_HOST = process.env.DAPR_HOST || 'http://localhost'
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || '3501'
const SERVER_HOST = process.env.SERVER_HOST || '127.0.0.1'
const SERVER_PORT = process.env.APP_PORT || '5002'

async function main() {
  const server = new DaprServer({
    serverHost: SERVER_HOST,
    serverPort: SERVER_PORT,
    clientOptions: {
      daprHost: DAPR_HOST,
      daprPort: DAPR_HTTP_PORT,
    },
  })
  const mailingService = new MailingService()

  server.pubsub.subscribe('emailpubsub', 'emails', async (data) => {
    const { invites, periodTitle } = data
    const successfulEmails = await Promise.all(
      invites.map(async (invite) => {
        const templateValue = {
          firstName: invite.supposedFirstName,
          periodTitle,
          loginLink: `http://localhost:4003/login`,
          registerLink: `http://localhost:4003/register/${invite.id}`,
        }
        const generatedHtml = mailingService.generateMail(
          templateValue,
          'candidate',
        )
        const wasSuccessful = await mailingService.sendMail({
          to: invite.supposedEmail,
          subject: 'Szakkollégiumi Felvételi',
          html: generatedHtml,
        })
        return wasSuccessful ? invite.id : null
      }),
    )
    return successfulEmails.filter(Boolean)
  })

  await server.start()
}

main().catch((e) => console.error(e))
