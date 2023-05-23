import { Injectable, Logger } from '@nestjs/common'
import axios from 'axios'
import * as ejs from 'ejs'

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
    default: `src/mailing/templates/candidate.ejs`,
    candidate: `src/mailing/templates/candidate.ejs`,
  }
  static mailServerUrl = ''
  static apiKey = ''
  static setupComplete = false
  private readonly logger = new Logger(MailingService.name)

  /**
   * Sets up everything for MailingService. This reads in all the templates in order to speed up sending and to check if the files exist.
   * @param mailServerUrl - The endpoint of the service which will handle the delivery of the e-mail.
   * @param apiKey - The API key for the server (X-Api-Key value).
   */
  static setup({ mailServerUrl, apiKey }: Setup) {
    if (!apiKey) throw 'API key is not provided for Mailing Service'
    if (!mailServerUrl)
      throw 'Mail server URL is not provided for Mailing Service'
    MailingService.apiKey = apiKey
    MailingService.mailServerUrl = mailServerUrl
    MailingService.setupComplete = true
  }

  /**
   * Generates an HTML code for the given template filled in with values you provide.
   * @param values - The values you might refer to in your EJS file. This is not type checked!
   * @param templateName - One of the template names you provided during the setup process.
   */
  generateMail(
    values: unknown,
    templateName: keyof typeof MailingService.templates = 'default',
  ) {
    MailingService.checkSetup()
    return ejs.render(MailingService.templates[templateName], values)
  }

  /**
   * Sends a mail through the mailing delivery service provided in the setup process.
   * @param {SendMail[]} data - Array of objects containing to, from, subject and html string fields.
   */
  async sendMail(data: SendMail) {
    MailingService.checkSetup()
    // if (process.env.NODE_ENV !== 'production') {
    //   this.logger.debug(
    //     `The app would be sending ${data.length} email(s) right now, but email sending is only enabled in production.`,
    //   )
    //   return Promise.resolve(false)
    // }
    return axios
      .post(MailingService.mailServerUrl, data, {
        headers: { 'X-Api-Key': MailingService.apiKey },
      })
      .then(() => {
        this.logger.log(`Email data sent to Kir-Dev email service`)
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
