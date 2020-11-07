
const db=require('../config/db.config1')

const passport = require('passport');

const facebookStrategy = require('passport-facebook').Strategy

passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : "809660549832404",
    clientSecret    : "092d43135a863a7baf9d61d84e913cf1",
    callbackURL     : "http://localhost:3000/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email'],
    enableProof: true
},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {
    //console.log(profile)
    let id    = profile.id; // set the users facebook id                   
    let tok = token; // we will save the token that facebook provides to the user                    
    let firstName  = profile.name.givenName
    let lastName=profile.name.familyName; // look at the passport user profile to see how names are returned
    let email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
    //let gender = profile.gender
    //let pic = profile.photos[0].value
    db.execute("SELECT count(*) as ink FROM fb_users WHERE email='"+email+"'")
      .then(([row])=>{
        if(row[0].ink){
            console.log("User Found")
        }
        else{
            db.execute("INSERT INTO fb_users(firstName,lastName,email)VALUES('"+firstName+"','"+lastName+"','"+email+"')")
            .then(result=>console.log(result)).catch(err=>console.log(err))
            
        }
    }).catch(err=>{
        console.log(err)
        //logger.debug(err)
     })

    done(null, profile);
}))
   
passport.serializeUser(function(user, done) {
    done(null, user);
});
// used to deserialize the user
passport.deserializeUser(function(user, done) {
    /*User.findById(id, function(err, user) {
        done(err, user);
    });*/
    done(null, user);
});