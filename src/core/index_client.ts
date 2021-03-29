import CKClientConnection from './CKClientConnection'
import CloudKit from 'tsl-apple-cloudkit'
import { AuthTokenStoreOptions } from './AuthTokenStore'
import { connectionFactory } from './connectionInstance'

let connection: CKClientConnection
function setup(config: CloudKit.ClientContainerConfig, authTokenStoreOptions: AuthTokenStoreOptions = {}): CKClientConnection {
  connection = new CKClientConnection(config, authTokenStoreOptions)
  connectionFactory(connection)
  return connection
}

export {
  connection,
  CKClientConnection,
  setup
}
