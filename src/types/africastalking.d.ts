
declare module 'africastalking' {
  interface SmsOptions {
    to: string | string[];
    message: string;
    from?: string;
    enqueue?: boolean;
    keyword?: string;
    linkId?: string;
    retryDurationInHours?: number;
  }

  interface SmsRecipient {
    status: string;
    number: string;
    cost: string;
    messageId: string;
  }

  interface SmsMessageData {
    Recipients: SmsRecipient[];
  }

  interface SmsResponse {
    SMSMessageData: SmsMessageData;
  }

  interface SMS {
    send(options: SmsOptions): Promise<SmsResponse>;
  }

  interface AfricaTalkingInstance {
    SMS: SMS;
  }

  interface AfricaTalkingConfig {
    apiKey: string;
    username: string;
  }

  function AfricasTalking(config: AfricaTalkingConfig): AfricaTalkingInstance;

  export default AfricasTalking;
}
