const LocalStrategy = require('passport-local').Strategy;
const GiangVien = require('../../models/GiangVien');
const bcrypt = require('bcrypt');

let initPassportLocal = (passport) => {
    passport.use(new LocalStrategy(
        function(username, password, done){
            GiangVien.get(username.toLowerCase())
                .then(async (data) => {
                    if(data.rowCount > 0){
                        let giangvien = data.rows[0];

                        if(await bcrypt.compare(password, giangvien.matkhau)){
                            const { magiangvien, hoten, admin} = giangvien;
                            done(null, { magiangvien, hoten, admin });
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