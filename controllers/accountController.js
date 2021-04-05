const Account = require('../models/account');

module.exports = {
    getAccountByUserName(req, res){
        Account.get(req.params.username)
            .then(data => {
                if(data.rowCount > 0){
                    
                    let { fullname } = data.rows[0];
                    res.render('index', { fullname });
                }else{
                    res.send('Lỗi');
                }
            })
            .catch(() => { 
                res.send('Lỗi');
            });
    },
}