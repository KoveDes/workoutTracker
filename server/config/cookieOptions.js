const {production} = require("./config");


exports.cookieOptions = {
    httpOnly: true,
    sameSite:  production ? 'None' : 'lax',
    secure:  production ? 'true' : 'false',
    maxAge: 24 * 60 * 60 * 1000,
}
exports.expirationTime = {
    RT: '1d',
    AT: '15min',
}