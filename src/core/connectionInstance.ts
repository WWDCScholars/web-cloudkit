import CKConnection from './CKConnection'

let connection: CKConnection
function connectionFactory(connectionInstance: CKConnection) {
  connection = connectionInstance
}

export {
  connection,
  connectionFactory
}
