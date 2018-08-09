const jwt = require('jsonwebtoken');

module.exports = {
    // Gera o JWT para um usuário. sub -> subscribe; iat -> issued at time
    tokenForUser: function(user) {
        return jwt.sign({ sub: user.id }, process.env.HASHSTRING, { expiresIn: '24h' });
    },
    decode: function(token) {
        return jwt.verify(token, process.env.HASHSTRING);
    }
}