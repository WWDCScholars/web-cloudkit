export default interface Options {
  container: {
    containerIdentifier: string
    apiToken: string
    environment: string
  }
  authTokenStore?: {
    expires?: number
    secure?: boolean
  }
}
