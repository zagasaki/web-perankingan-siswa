function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        return res.redirect('/login');
    }
}
module.exports = { isAuthenticated };