const LocalStrategy = require('passport-local').Strategy;
const GiangVien = require('../../models/GiangVien');
const bcrypt = require('bcrypt');

let initPassportLocal = (passport) => {
    passport.use(new LocalStrategy(
        function(username, password, done){
            GiangVien.get(username)
                .then(async (data) => {
                    if(data.rowCount > 0){
                        let giangvien = data.rows[0];
                        
                        if(await bcrypt.compare(password, giangvien.matkhau)){
                            done(null, { magiangvien: giangvien.magiangvien });
                        }else{
                            done(null, false);
                        }
                    }else{
                        done(null, false);
                    }
                })
                .catch(err => {
                    done(err);
                });
        }
    ));
    
    passport.serializeUser(function(user, done) {
        return done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        return done(null, user);      
    });
}

module.exports = initPassportLocal;