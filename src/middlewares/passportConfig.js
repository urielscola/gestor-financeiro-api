module.exports = function(passport) {

  const JwtStrategy = require('passport-jwt').Strategy;
  const ExtractJwt = require('passport-jwt').ExtractJwt;
  const LocalStrategy = require('passport-local');
  const User = require('../models/user');
  
  // Instância do LocalStrategy
  const localOptions = { usernameField: 'email' };
  const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  
      /* 
      ** Verifica o email e senha, se existir um usuário com aquele email
      ** Passa para o done() o usuário e um null no erro 
      ** Se não existir, passa para o done() null para o erro e false para o usuário 
      */
  
      User.findOne({ email: email }, function(err, user) {
          if (err) { return done(err); }
          if (!user) { console.log("Aqui"); return done(null, false, { message: 'E-mail inválido.' } ); }
  
          // Compara as senhas, se a senha informada pelo usuário for igual à que está no banco, após o unencrypt, retorna o user, se não, false
          user.comparePassword(password, function(err, isMatch) {
              if (err) { return done(err); }
              if (!isMatch) { return done(null, false); }
  
              return done(null, user);
          });
      });
  });
  
  
  
  
  
  // Options necessárias para o JWT Strategy
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.HASHSTRING
  };
  
  // Instância do JWT strategy
  const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  
    /* 
    ** Procura o usuário pelo ID no banco
    ** Se existir, passa para o done() o usuário e um null no erro 
    ** Se não existir, passa para o done() null para o erro e false para o usuário 
    */
  
    User.findById(payload.sub, function(err, user) {
  
      if (err) { return done(err, false); }
  
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  });
  
  passport.use(jwtLogin);
  passport.use(localLogin);
};

