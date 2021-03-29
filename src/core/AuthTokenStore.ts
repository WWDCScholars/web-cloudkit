export default class AuthTokenStore {
  private options: AuthTokenStoreOptions

  constructor(options: AuthTokenStoreOptions) {
    this.options = options
  }

  putToken(containerIdentifier: string, authToken: string | null): void {
    const date = new Date()

    if (authToken) {
      // default is set time to expire in 14 days
      const expires = this.options.expires ?? (14 * 24 * 60 * 60 * 1000)
      date.setTime(date.getTime() + expires)
    } else {
      // set time to 1970-01-01
      date.setTime(0)
    }

    const cookieParts = [
      `${containerIdentifier}=${authToken || ''}`,
      `expires=${date.toUTCString()}`,
      'path=/',
      'SameSite=Lax'
    ]

    if (this.options.secure === true) {
      cookieParts.push('Secure')
    }

    // set the cookie
    document.cookie = cookieParts.join('; ')
  }

  getToken(containerIdentifier: string): string {
    const value = '; ' + document.cookie
    const parts = value.split('; ' + containerIdentifier + '=')

    if (parts.length === 2) {
      return (parts.pop()!.split(';').shift() || null) as string
    }

    return null as unknown as string
  }
}

export interface AuthTokenStoreOptions {
  /**
   * Time interval from now until the cookie expiry date.
   */
  expires?: number

  /**
   * Use the `Secure` attribute for the cookie.
   */
  secure?: boolean
}
