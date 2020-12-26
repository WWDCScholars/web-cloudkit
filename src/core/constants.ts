import { env } from "process"

const constants = {
  cloudKit: {
    baseURL: 'https://api.apple-cloudkit.com',
    endpoints: {
      upload: '/database/1/%cid/%env/public/assets/upload'
    }
  }
}

export default constants

export function endpointPath(path: string, containerIdentifier: string, environment: string): string {
  return path
    .replace('%cid', containerIdentifier)
    .replace('%env', environment)
}

export function apiURL(endpoint: string, containerIdentifier: string, environment: string): string {
  if (!constants.cloudKit.endpoints.hasOwnProperty(endpoint)) {
    throw new Error('Endpoint does not exist')
  }

  const path = endpointPath((constants.cloudKit.endpoints as any)[endpoint], containerIdentifier, environment)

  return `${constants.cloudKit.baseURL}${path}`
}
