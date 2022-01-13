var express = require('express');
var router = express.Router();
const executeQuery = require('../modules/sqlscript.js');   //chiamo il modulo personalizzato che apre una connessione al DB ed elabora le query
const session = require('express-session');

router.use(session({secret: 'abcde', resave: true, saveUninitialized: true}));


router.get('/registration', function(req, res, next) {
    res.render('register', { title: 'Private area - Register' });
});

router.post('/registration', function(req, res, next) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    executeQuery(`select id from users where email = '?'`, [email], function(error, results){
        if(results.length > 0){
            res.send(`<p>L'email inserita è già stata registrata.</p>`);
        } else {
            if(password != confirmPassword){
                    res.send(`<p>Le password non coincidono</p>`);
            } else {
                executeQuery(`insert into users(username, email, password) values(?,?,?))`, [username, email, password], function(error, results){
                    res.send(`<p>Utente registrato correttamente. <br>Puoi accedere al tuo account andando alla <a href="./login">pagina di login</a>.</p>`);
                });
            }
        }
    });
});

router.get('/', function(req, res, next) {
    if(req.session.user){
        return res.render('account', { title: 'Private area' });
    }else {
        return res.redirect('/login');
    }
});

router.post('/', function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    executeQuery(`select id from users where email = ? and password = ?`, [email, password], function(error, results){
        if(error) throw error;
        if(results == 0){
            return res.send(`<p>Email o password errati, riprovare.</p>`);
        } else {
            req.session.user = email;
            return res.redirect('/account');
        }
    });
});

router.get('/users', function(req, res, next) {
    if(!req.session.user) return res.redirect('/login');
    executeQuery(`select * from users`, [], function(error, results){
        if(error) throw error;
        res.render('users',{users: results});
    });
});

router.get('/users:email', function(req, res, next) {
    if(!req.session.user) return res.redirect('/login');
    executeQuery(`select * from users where where email = ?`, [req.params.email], function(error, results){
        if(error) throw error;
        res.render('user',results[0]);
    });
});


router.get('/login', function(req, res, next) {
    if(req.session.user){
        return res.redirect('/account');
    }else {
        return res.render('login', { title: 'Private area - Login' });
    }
});


module.exports = router;