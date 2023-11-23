const { MongoClient } = require('mongodb');
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
app.set('view engine', 'ejs');

const uri = "mongodb+srv://admin:admin@cluster1.jk0ivpj.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'S381F_GroupProject';

const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect()
    .then(() => {
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        const collection = db.collection('UserAccount');
        const booksCollection = db.collection('Books');
        app.post('/login', async (req, res) => {
            const { username, password } = req.body;
            console.log(username, password)
            const userAccount = await collection.findOne({ username });
            console.log(userAccount.username, userAccount.password, userAccount.userrole)
            if (userAccount) {
                const passwordMatch = password === userAccount.password;

                if (passwordMatch) {
                    req.session.user = userAccount;

                    if (userAccount.userrole === "student") {
                        res.redirect('/student');
                    } else if (userAccount.userrole === "admin") {
                        res.redirect('/admin');
                    } else {
                        res.redirect('/');
                    }
                } else {
                    res.redirect('/');
                }
            } else {
                res.redirect('/');
            }
        });

        app.get('/', (req, res) => {
            res.render('login');
        });

        app.get('/student', (req, res) => {
            if (req.session.user && req.session.user.userrole === "student") {
                res.sendFile('student.html', { root: __dirname + '/public' });
            } else {
                res.redirect('/');
            }
        });

        app.get('/admin', async (req, res) => {
            if (req.session.user && req.session.user.userrole === "admin") {
                try {
                    const books = await booksCollection.find().toArray();
                    res.render('admin', { books });
                } catch (error) {
                    console.error('Error retrieving books:', error);
                    res.redirect('/');
                }
            } else {
                res.redirect('/');
            }
        });

        app.get('/admin/search', async (req, res) => {
            const searchQuery = req.query.search;
            const filter = req.query.filter;
            
            try {
              let query = {};
          
              if (filter === 'title') {
                query = { title: { $regex: searchQuery, $options: 'i' } };
              } else if (filter === 'author') {
                query = { author: { $regex: searchQuery, $options: 'i' } };
              } else if (filter === 'ISBN') {
                query = { ISBN: { $regex: searchQuery, $options: 'i' } };
              } else if (filter === 'publication') {
                query = { publication: { $regex: searchQuery, $options: 'i' } };
              } else if (filter === 'genre') {
                query = { genre: { $regex: searchQuery, $options: 'i' } };
              } else if (filter === 'availability') {
                query = { availability: { $regex: searchQuery, $options: 'i' } };
              } else if (filter === 'borrower_id') {
                query = { borrower_id: { $regex: searchQuery, $options: 'i' } };
              } else if (filter === 'loan_period') {
                query = { loan_period: { $regex: searchQuery, $options: 'i' } };
              }
          
              const books = await booksCollection.find(query).toArray();
              res.render('admin', { books });
            } catch (error) {
              console.error('Error searching books:', error);
              res.redirect('/admin');
            }
          });

        app.get('/logout', (req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                }
                res.redirect('/');
            });
        });

        app.post('/books/delete/:ISBN', async (req, res) => {
            const ISBN = req.params.ISBN;
            console.log(ISBN);
            try {
                await booksCollection.deleteOne({ ISBN: ISBN });
                res.sendStatus(200);
            } catch (error) {
                console.error('Error deleting book:', error);
                res.sendStatus(500);
            }
        });

        async function getBookDetails(ISBN) {
            try {
                const book = await booksCollection.findOne({ ISBN });
                return book || null;
            } catch (error) {
                console.error('Error retrieving book:', error);
                return null;
            }
        }

        app.get('/details', async (req, res) => {
            const ISBN = req.query.ISBN;
            const book = await getBookDetails(ISBN);
            if (book) {
                res.render('booksdetails', { book });
            } else {
                res.status(404).send('Book not found');
            }
        });
        const { ObjectId } = require('mongodb');
        app.post('/books/update/:_id', async (req, res) => {
            const updatedData = req.body;
            try {
                const bookId = new ObjectId(req.params._id);
                await booksCollection.updateOne({ _id: bookId }, { $set: updatedData });
                res.sendStatus(200);
            } catch (error) {
                console.error('Error updating book:', error);
                res.sendStatus(500);
            }
        });
        
        app.post('/books/add', async (req, res) => {
   
            try {
              const result = await booksCollection.insertOne({
                title: req.body.title,
                author: req.body.author,
                publication: req.body.publication,
                genre: req.body.genre,
                availability:req.body.availability,
                borrower_id:req.body.borrower_id,
                loan_period:req.body.loan_period,
                ISBN:req.body.ISBN,
                abstract:req.body.abstract,
                publish_date:req.body.publish_date,
                image:req.body.image
              });
          
              if (result.insertedCount === 1) {
                res.status(200).send('Book added successfully');
              } else {
                res.status(500).send('Failed to add book');
              }
            } catch (error) {
              console.error('Error adding book:', error);
              res.status(500).send('Failed to add book');
            }
          });
        const server = app.listen(3000, () => {
            console.log('Server started on port 3000');
        });

        process.on('SIGINT', () => {
            server.close(() => {
                console.log('Server stopped');
                client.close();
                process.exit(0);
            });
        });
    })
    .catch((error) => {
        console.error(error);
    });