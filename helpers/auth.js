module.exports = {
    isAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Prieiga negalima. Prašome prisijungti');
        res.redirect('/users/login');
    }
};
