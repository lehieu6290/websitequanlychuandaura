const MucDiem = require("../models/MucDiem");

module.exports = {
    getAllJSON(req, res){
        if(req.isAuthenticated()){
            MucDiem.getAll()
            .then(data => {
                res.json({status: true, data: data});
            })
            .catch(() => {
                res.json({status: false})
            })
        }else{
            res.redirect('/login');
        }
    },
}