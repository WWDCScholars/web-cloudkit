export default class AuthTokenStore {
    putToken(containerIdentifier, authToken) {
        const date = new Date();
        let path = '';
        if (authToken) {
            // set time to expire in 14 days
            date.setTime(date.getTime() + (14 * 24 * 60 * 60 * 1000));
            path = '; path=/';
        }
        else {
            // set time to 1970-01-01
            date.setTime(0);
        }
        // set the cookie
        document.cookie = `${containerIdentifier}=${authToken || ''}; expires=${date.toUTCString()}${path}`;
    }
    getToken(containerIdentifier) {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + containerIdentifier + '=');
        if (parts.length === 2) {
            return parts.pop().split(';').shift() || null;
        }
        return null;
    }
}
//# sourceMappingURL=AuthTokenStore.js.map