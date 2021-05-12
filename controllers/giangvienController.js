const passport = require('passport');

module.exports ={
    renderLoginView(req, res){
        if(req.isAuthenticated()){
            res.redirect('/');
        }else{
            const {error} = req.query;
            
            res.render('login', {error});
        }
    },

    renderIndexView(req, res){
        if(req.isAuthenticated()){
            res.redirect('/lophocphan')
            // res.render('index', { hoten: req.user.hoten, admin: req.user.admin });
        }else{
            res.redirect('login');
        }
    },

    login(req, res, next){
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login?error=true'); }
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