export default class AuthTokenStore {
  putToken(containerIdentifier: string, authToken: string | null): void {
    const date = new Date()

    if (authToken) {
      // set time to expire in 14 days
      date.setTime(date.getTime() + (14 * 24 * 60 * 60 * 1000))
    } else {
      // set time to 1970-01-01
      date.setTime(0)
    }

    // set the cookie
    document.cookie = `${containerIdentifier}=${authToken || ''}; expires=${date.toUTCString()}; path=/; SameSite=Lax; Secure`
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
