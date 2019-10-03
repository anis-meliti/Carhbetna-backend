const express = require('express');
const connectDB = require('./config/db');

const app = express();
// connect DB

connectDB();
// init middelWare
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send(res.json));
// Define Routes
app.use('/register', require('./routes/api/user'));
app.use('/login', require('./routes/api/auth'));
app.use('/profile', require('./routes/api/Profile/profile'));
app.use('/preference', require('./routes/api/Profile/preferences'));
app.use('/car', require('./routes/api/Profile/car'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, err =>
  err ? console.log(err) : console.log('server is running on port', PORT)
);
