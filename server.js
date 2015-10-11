'use strict';
const express = require('express'),
      passport = require('passport'),
      htpasswd = require('htpasswd'),
      BasicStrategy = require('passport-http').BasicStrategy,
      app = express();

// Configuring passport
passport.use(new BasicStrategy(
  {
    // Custom message to user
    realm: 'Private project, you must authenticate'
  },
  function(username, password, done) {
    // The password is: bar
    if (username === 'foo' && htpasswd.verify('$apr1$QNz1wNjZ$YFyKIPRxB0tcpOYmXvitK1', password)) {
      const user = { name: username };
      return done(null, user);
    }
    return done(null, false);
  }));

// Using autentication
app.use(passport.authenticate('basic', { session: false }));

// My app
app.get('/', passport.authenticate('basic', { session: false }), (request, response) => {
  response.send(`Bienvenido a mi proyecto privado, ${request.user.name} :)`);
});

// Starting server
const server = app.listen(3000, () => {
  console.log('Server listening...');
});
