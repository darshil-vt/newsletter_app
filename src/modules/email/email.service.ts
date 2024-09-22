import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class EmailService {
    private ses: AWS.SES;

  constructor() {
    this.ses = new AWS.SES({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION, 
    });
  }

  async sendEmail(
    to: string, 
    subject: string, 
    body: string, 
  ): Promise<any> {
    const params = {
      Source: process.env.AWS_VERIFIED_EMAIL,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body, 
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
    };

    try {
      const result = await this.ses.sendEmail(params).promise();
      return result;
    } catch (error) {
      console.error('Error sending email: ', error);
      throw error;
    }
  }
}
