const User = require("./user");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

// module.exports = function (passport) {
//   passport.use(
//     new localStrategy((username, password, done) => {
//       User.findOne({ username: username }, (err, user) => {
//         if (err) throw err;
//         if (!user) return done(null, false);
//         if (user) {
//           bcrypt.compare(password, user.password, (err, result) => {
//             if (err) throw err;
//             if (result === true) {
//               return done(null, user);
//             } else {
//               return done(null, false);
//             }
//           });
//         }
//       });
//     })
//   );
//   passport.serializeUser(function(user, done){
//     done(null, user.id);
// });
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         done(err, user);
//     });
// });
// };

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      //match user
      User.findOne({ username: username })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          //match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
  passport.serializeUser(function (user, done) {
    console.log(user + "done1");
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      console.log(user + "done");
      done(err, user);
    });
  });
};
