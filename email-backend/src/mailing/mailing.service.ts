import { Injectable, Logger } from '@nestjs/common'
import axios from 'axios'
import * as ejs from 'ejs'

import { readFileSync } from 'fs'
import { MailingModule } from './mailing.module'

interface SendMail {
  to: string
  subject: string
  html: string
}

export interface Setup {
  apiKey: string
  mailServerUrl: string
}

class SetupIncompleteException extends Error {
  message = `You need to set up ${MailingService.name} through ${MailingModule.name} in order to properly use it!`
}

@Injectable()
export class MailingService {
  static templates: Record<string, string> = {
    default: `dist/mailing/templates/candidate.ejs`,
    candidate: `dist/mailing/templates/candidate.ejs`,
  }
  static mailServerUrl = ''
  static apiKey = ''
  static setupComplete = false
  private readonly logger = new Logger(MailingService.name)

  static setup({ mailServerUrl, apiKey }: Setup) {
    if (!apiKey) throw 'API key is not provided for Mailing Service'
    if (!mailServerUrl)
      throw 'Mail server URL is not provided for Mailing Service'
    MailingService.apiKey = apiKey
    MailingService.mailServerUrl = mailServerUrl
    MailingService.setupComplete = true
  }

  generateMail(
    values: unknown,
    templateName: keyof typeof MailingService.templates = 'default',
  ) {
    MailingService.checkSetup()
    const fileContent = readFileSync(
      MailingService.templates[templateName],
    ).toString()
    return ejs.render(fileContent, values)
  }

  async sendMail(data: SendMail) {
    MailingService.checkSetup()
    return axios
      .post(MailingService.mailServerUrl, data, {
        headers: { 'X-Api-Key': MailingService.apiKey },
      })
      .then(() => {
        this.logger.log(`Email data sent to HTTP email service`)
        return true
      })
      .catch((e) => {
        this.logger.log('Error during email sending')
        this.logger.error(e)
        return false
      })
  }

  private static checkSetup() {
    if (!MailingService.setupComplete) throw new SetupIncompleteException()
  }
}
