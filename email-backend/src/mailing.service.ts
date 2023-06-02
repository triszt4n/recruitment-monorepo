import axios from 'axios'
import * as ejs from 'ejs'

import { readFileSync } from 'fs'

interface SendMail {
  to: string
  subject: string
  html: string
}

export interface Setup {
  apiKey: string
  mailServerUrl: string
}

export class MailingService {
  static templates: Record<string, string> = {
    default: `dist/mailing/templates/candidate.ejs`,
    candidate: `dist/mailing/templates/candidate.ejs`,
  }
  static mailServerUrl = process.env.MAIL_SERVER_URL
  static apiKey = process.env.MAIL_API_KEY

  generateMail(
    values: unknown,
    templateName: keyof typeof MailingService.templates = 'default',
  ) {
    const fileContent = readFileSync(
      MailingService.templates[templateName],
    ).toString()
    return ejs.render(fileContent, values)
  }

  async sendMail(data: SendMail) {
    return axios
      .post(MailingService.mailServerUrl, data, {
        headers: { 'X-Api-Key': MailingService.apiKey },
      })
      .then(() => {
        return true
      })
      .catch((e) => {
        return false
      })
  }
}
