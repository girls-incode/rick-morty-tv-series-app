export function decodeToken(token: string) {
    try {
        if (token.split('.').length !== 3 || typeof token !== 'string') {
            return null;
        } else {
            let payload = token.split('.')[1];
            let base64 = payload.replace('-', '+').replace('_', '/');
            return JSON.parse(atob(base64));
        }
    } catch (error) {
        return null;
    }
}

function isTokenExpired(token) {
    let decodedToken = decodeToken(token);
    let result = true;

    if (decodedToken && decodedToken.exp) {
        let expirationDate = new Date();
        expirationDate.setUTCSeconds(decodedToken.exp);
        result = expirationDate.valueOf() < new Date().valueOf();
    }

    return result;
}