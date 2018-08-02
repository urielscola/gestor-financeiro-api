const passport = require('passport');
const passportConfig = require('../middlewares/passportConfig')(passport);
const router = require('express').Router();

const tokenForUser = require('../helpers/jwtHelper').tokenForUser;

// passport middlewares
const requireAuth = require('../middlewares/passportMiddlewares').requireAuth;
const requireSignin = require('../middlewares/passportMiddlewares').requireSignin;
const User = require('../models/user');

router.post('/signup', function(req, res, next) {
    const { email } = req.body;
    const { password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'Você precisa preencher e-mail e senha.'});
    }

    // Checando se já existe um usuário com aquele e-mail
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // Se já houver usuário com aquele e-mail, propagar um erro
        if (existingUser) {
            return res.status(422).send({ error: 'E-mail em uso' });
        }

        // Se NÃO existir algum usuário com o e-mail, cadastrá-lo
        const user = new User({
            email: email,
            password: password
        });

        user.save(function(err) {
            if (err) { return next(err); }

            // Resposta indicando o token para o usuário registrado
            res.json({ token: tokenForUser(user) });
        });

    });
});

router.post('/signin', requireSignin, function(req, res) {
    // Se chegou aqui, já passou pela validação (requireSignin) do passport e email/senha estavam corretos
    // Então basta fornecer um token
    res.send({ token: tokenForUser(req.user) });
});

module.exports = router;