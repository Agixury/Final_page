/** 
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});
*/
const db = require('../config/db.config1')

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

passport.use(new GoogleStrategy({
  clientID:"644450445537-065ije5pbgi4m1mithh32n4tv2gr15kb.apps.googleusercontent.com",
  clientSecret:"8F1-E1WRUwv1icCoQdm9tJDB",
  callbackURL:"http://localhost:3000/google/callback",
      passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {

    let firstname=profile.given_name;
    let lastname=profile.family_name;
    let email=profile.email;
    let tok = profile.sub;
    db.execute("SELECT count(*) as ink FROM google_users WHERE email='"+email+"'")
      .then(([row])=>{
      if(row[0].ink){
        console.log("User Found")
     }
    else{
      db.execute("INSERT INTO `google_users`(`firstname`, `lastname`, `email`, `token`) VALUES ('"+firstname+"','"+lastname+"','"+email+"','"+tok+"')")
      .then(result=>console.log(result)).catch(err=>console.log(err))
    }
  }).catch(err=>{
    console.log(err)
    //logger.debug(err)
  })
  done(null, profile);
}))