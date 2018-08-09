const passport = require('passport');
const passportConfig = require('../middlewares/passportConfig')(passport);
const router = require('express').Router();

const tokenForUser = require('../helpers/jwtHelper').tokenForUser;

// passport middlewares
const requireSignin = require('../middlewares/passportMiddlewares').requireSignin;

// Models
const User = require('../models/user');

// @TODO: Usar express validator para validação de inputs


router.post('/signup', function(req, res, next) {
    const { email } = req.body;
    const { password } = req.body;
    const { username } = req.body;

    if (!email || !password || !username) {
        return res.status(400).send({ error: 'Você precisa preencher e-mail, username e senha.'});
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        return res.status(400).send({ error: 'O e-mail informado é inválido.'});
    } else if (password.length < 6) {
        return res.status(400).send({ error: 'A senha deve ter pelo menos 6 caracteres.'});
    } else if (username.length < 3) {
        return res.status(400).send({ error: 'O username deve ter pelo menos 3 caracteres.'});
    }


    // Checando se já existe um usuário com aquele e-mail
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // Se já houver usuário com aquele e-mail, propagar um erro
        if (existingUser) {
            return res.status(400).send({ error: 'E-mail em uso' });
        }

        // Se NÃO existir algum usuário com o e-mail, cadastrá-lo
        const user = new User({
            email: email,
            password: password,
            username: username
        });

        user.save(function(err) { 
            if (err) { 
                console.log(err.ValidationError);
                return next(err); 
            }

            // Resposta indicando o token para o usuário registrado
            res.status(201).json({ success: true, token: tokenForUser(user), user: user });
        });

    });
});

router.post('/signin', requireSignin, function(req, res) {
    // Se chegou aqui, já passou pela validação (requireSignin) do passport e email/senha estavam corretos
    // Então basta fornecer um token

    res.status(200).send({ success: true, token: tokenForUser(req.user), user: req.user });
});


module.exports = router;