import CKServerConnection from './CKServerConnection'
import CloudKit from 'tsl-apple-cloudkit'
import { connectionFactory } from './connectionInstance'

let connection: CKServerConnection | null
function setup(config: CloudKit.ServerContainerConfig, log: boolean = true): CKServerConnection {
  connection = new CKServerConnection(config, log)
  connectionFactory(connection)
  return connection
}

export {
  connection,
  CKServerConnection,
  setup
}
