const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// app.use(cors({
//     origin: 'http://192.168.21.129:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
// }));

// Middleware pour définir explicitement les en-têtes CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://192.168.21.129:3000');
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connexion à la base de données
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

// Route de connexion vulnérable aux injections SQL
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Requête SQL construite directement avec des entrées utilisateur
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hello, this is a text response!');
});

// Démarrer le serveur
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});