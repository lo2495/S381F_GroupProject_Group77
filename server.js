const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster1.jk0ivpj.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'S381F_GroupProject';
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect()
    .then(() => {
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const collection = db.collection('UserAccount');

        app.post('/login', async (req, res) => {
            const { username, password } = req.body;
        
            const userAccount = await collection.findOne({ username });
        
            if (userAccount) {
                const passwordMatch = password === userAccount.password;
        
                if (passwordMatch) {
                    req.session.user = { username };
                    res.redirect('/home');
                } else {
                    res.redirect('/login');
                }
            } else {
                res.redirect('/login');
            }
        });

        app.get('/login', (req, res) => {
            res.sendFile('login.html', { root: __dirname + '/views' });
        });

        app.get('/home', (req, res) => {
            if (req.session.user) {
                
              res.sendFile('home.html', { root: __dirname + '/views' });
            } else {
              res.redirect('/login');
            }
        });
        app.get('/logout', (req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                }
                res.redirect('/login');
            });
        });
        const server = app.listen(3000, () => {
            console.log('Server started on port 3000');
        });

        process.on('SIGINT', () => {
            server.close(() => {
                console.log('Server stopped');
                process.exit(0);
            });
        });
    })
    .catch((error) => {
        console.error(error);
    });