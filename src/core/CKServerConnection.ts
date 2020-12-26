import fetch from 'node-fetch'
import crypto from 'crypto'
import CloudKit from 'tsl-apple-cloudkit'
import CKConnection from './CKConnection'
import ECDSASigner from './ECDSASigner'
import constants, { endpointPath, apiURL } from './constants'

export default class CKServerConnection extends CKConnection {
  private config: CloudKit.ServerContainerConfig

  private get ecdsaSigner(): ECDSASigner {
    if (!this.config.serverToServerKeyAuth || !this.config.serverToServerKeyAuth.privateKeyFile) {
      throw new Error('Private key file not found')
    }

    return new ECDSASigner(this.config.serverToServerKeyAuth.privateKeyFile, this.config.serverToServerKeyAuth.privateKeyPassPhrase)
  }

  public constructor(config: CloudKit.ServerContainerConfig, log: boolean = true) {
    super()

    this.config = config

    this.instance = CloudKit.configure({
      containers: [config],
      services: {
        fetch: fetch,
        logger: log ? console : undefined
      }
    })
  }

  public async setUpAuth(): Promise<CloudKit.UserIdentity | null> {
    return this.defaultContainer.setUpAuth()
  }

  // - upload assets

  public async requestUploadURL(recordType: string, fieldName: string): Promise<string> {
    const requestBody = {
      tokens: [{ recordType, fieldName }]
    }

    const date = new Date().toISOString().split('.')[0] + 'Z'
    const uploadSignature = this.uploadSignRequest(requestBody, date)

    const requestURL = apiURL('upload', this.config.containerIdentifier, this.config.environment)
    const response = await fetch(requestURL, {
      method: 'post',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'X-Apple-CloudKit-Request-KeyID': (this.config.serverToServerKeyAuth as any).keyID,
        'X-Apple-CloudKit-Request-ISO8601Date': date,
        'X-Apple-CloudKit-Request-SignatureV1': uploadSignature
      }
    })

    const json = await response.json()
    if (!json.tokens) {
      throw new Error(`Failed to request upload url: ${json.reason}`)
    }
    return json.tokens[0].url
  }

  private uploadSignRequest(requestBody: object, date: string): string {
    const uploadEndpointPath = endpointPath(constants.cloudKit.endpoints.upload, this.config.containerIdentifier, this.config.environment)
    const requestString = this.uploadRequestString(requestBody, uploadEndpointPath, date)

    return this.ecdsaSigner.sign(requestString)
  }

  private uploadRequestString(requestBody: object, path: string, date: string): string {
    const payloadString = JSON.stringify(requestBody)
    const payloadHash = crypto
      .createHash('sha256')
      .update(payloadString)
      .digest('base64')



    return `${date}:${payloadHash}:${path}`
  }
}
