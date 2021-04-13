const passport = require('passport');

module.exports ={
    renderLoginView(req, res){
        if(req.isAuthenticated()){
            res.redirect('/');
        }else{
            res.render('login');
        }
    },

    renderIndexView(req, res){
        if(req.isAuthenticated()){
            res.render('index', { fullname: req.user.magiangvien });
        }else{
            res.redirect('login');
        }
    },

    login(req, res, next){
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/');
            });
        })(req, res, next);
    },

    logout(req, res){
        req.logout();
        res.redirect('/login');
    },
}