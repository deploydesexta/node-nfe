import { readFileSync } from "fs";

export interface Certificate {
  content(): Buffer
  pass(): string
}

export class PFXCertificate implements Certificate {

  constructor(
    private readonly _content: Buffer,
    private readonly _pass: string,
  ) {}

  content(): Buffer {
    return this._content;
  }

  pass(): string {
    return this._pass;
  }

  static fromFile(location: string, pass: string): PFXCertificate {
    return new PFXCertificate(readFileSync(location), pass);
  }

  static fromBase64(content: string, pass: string): PFXCertificate {
    return new PFXCertificate(Buffer.from(content, 'base64'), pass);
  }
}