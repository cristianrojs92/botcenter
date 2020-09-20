

export type incomingMessage = {
  accountSid: string;
  body: string;
  to: string;
  from: string;
}

export const enum typeOutgoingMessage  {
  JSON = "JSON",
  XML = "XML"
}