/*comandos npm
npm init
npm instal nodemon -g 
npm install -- save express
npm install express-session
npm install --save body-parser
npm install --save mysql
npm install ejs -save
*/

//require do express e do session
const express = require('express');
const session = require("express-session");
const path = require('path');
const app = express();

const bodyParser = require("body-parser");

//require do mysql
const mysql = require("mysql"); 
const { resolveSoa } = require('dns');

app.use(session({secret: "ssshhhhh"}));

app.use(express.static('public'))

//config engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));

//config bodyparser para leitura de post
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


function conectiondb(){
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root', 
        password: 'Niraj@2003', 
        database: 'dblogin' 
    });

    con.connect((err) => {
        if (err) {
            console.log('Error connecting to database...', err)
            return
        }
        console.log('Connection established!')
    });

    return con;
}


app.get('/', (req, res) => {
    var message = ' ';
    req.session.destroy();
    res.render('views/registro', { message: message });
});


app.get('/views/registro', (req, res)=>{
    res.redirect('../');
    //res.render('views/registro', {message:message});
});

app.get("/views/home", function (req, res){
    
    if (req.session.user){
        var con = conectiondb();
        var query2 = 'SELECT * FROM users WHERE email LIKE ?';
        con.query(query2, [req.session.user], function (err, results){
            res.render('views/home', {message:results});
            
        });
        
    }else{
        res.redirect("/");
    }
    
});

app.get("/views/login", function(req, res){
    var message = ' ';
    res.render('views/login', {message:message});
});

app.post('/register', function (req, res){

    var username = req.body.nome;
    var pass = req.body.pwd;
    var email = req.body.email;
    var idade = req.body.idade;

    var con = conectiondb();

    var queryConsulta = 'SELECT * FROM users WHERE email LIKE ?';

    con.query(queryConsulta, [email], function (err, results){
        if (results.length > 0){            
            var message = 'E-mail Not valid';
            res.render('views/registro', { message: message });
        }else{
            var query = 'INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?)';

            con.query(query, [username, email, idade, pass], function (err, results){
                if (err){
                    throw err;
                }else{
                    console.log ("User added with email " + email);
                    var message = "ok";
                    res.render('views/registro', { message: message });
                }        
            });
        }
    });
});

app.post('/log', function (req, res){
    var email = req.body.email;
    var pass = req.body.pass;
    var con = conectiondb();
    var query = 'SELECT * FROM users WHERE pass = ? AND email LIKE ?';
    
    //execução da query
    con.query(query, [pass, email], function (err, results){
        if (results.length > 0){
            req.session.user = email; //seção de identificação            
            console.log("Login Successful!");
            res.render('views/home', {message:results});
        }else{
            var message = 'Login incorreto!';
            res.render('views/login', { message: message });
        }
    });
});

app.post('/update', function (req, res){
    
    console.log("entrou");
    
    var email = req.body.email;
    var pass = req.body.pwd;
    var username = req.body.nome;
    var idade = req.body.idade;
    var con = conectiondb();
    var query = 'UPDATE users SET username = ?, pass = ?, idade = ? WHERE email LIKE ?';
    

    con.query(query, [username, pass, idade, req.session.user], function (err, results){
        
        var query2 = 'SELECT * FROM users WHERE email LIKE ?';
        con.query(query2, [req.session.user], function (err, results){
            res.render('views/home', {message:results});    
        });
        
    });
});

app.post('/delete', function (req, res){
    
    var username = req.body.nome;
    
    var con = conectiondb();
    var query = 'DELETE FROM users WHERE email LIKE ?';
    

    con.query(query, [req.session.user], function (err, results){
        res.redirect ('/');
    });
});

app.listen(8081, () => console.log(`App listening on port 8081!`));
