export default class AuthTokenStore {
    putToken(containerIdentifier: string, authToken: string | null): void;
    getToken(containerIdentifier: string): string | null;
}
