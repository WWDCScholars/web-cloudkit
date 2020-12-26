import fs from 'fs'
import crypto from 'crypto'

export default class ECDSASigner {
  private privateKey: string
  private privateKeyPassPhrase?: string

  public constructor(privateKeyFilePath: string, privateKeyPassPhrase?: string) {
    this.privateKey = fs.readFileSync(privateKeyFilePath, 'utf8')
    this.privateKeyPassPhrase = privateKeyPassPhrase
  }

  public sign(payload: string): string {
    return crypto
      .createSign('RSA-SHA256')
      .update(payload)
      .sign({
        key: this.privateKey,
        passphrase: this.privateKeyPassPhrase
      }, 'base64')
  }
}
