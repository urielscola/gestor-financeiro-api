const jwt = require('jwt-simple');

module.exports = {
    // Gera o JWT para um usuário. sub -> subscribe; iat -> issued at time
    tokenForUser: function(user) {
        return jwt.encode({ sub: user.id, iat: new Date().getTime() }, process.env.HASHSTRING);
    }
}