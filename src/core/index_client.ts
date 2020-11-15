import CKClientConnection from './CKClientConnection'
import CloudKit from 'tsl-apple-cloudkit'
import { connectionFactory } from './connectionInstance'

let connection: CKClientConnection
function setup(config: CloudKit.ClientContainerConfig): CKClientConnection {
  connection = new CKClientConnection(config)
  connectionFactory(connection)
  return connection
}

export {
  connection,
  CKClientConnection,
  setup
}
