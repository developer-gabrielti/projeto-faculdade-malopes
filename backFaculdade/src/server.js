const path = require('path');
const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

require('./database')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin: '*' }));
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("rodando na porta: " + PORT);
})