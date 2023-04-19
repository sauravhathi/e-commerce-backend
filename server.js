const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// connect db
const uri = process.env.DATABASE;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error);
});

db.once('open', () => {
    console.log('🪁 Database connected');
});

app.use('/', routes);

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
});