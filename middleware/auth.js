// middleware/auth.js

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        // Jika userId ada di session, lanjutkan ke route berikutnya
        return next();
    } else {
        // Jika user belum login, redirect ke halaman login
        return res.redirect('/login');
    }
}

module.exports = { isAuthenticated };
