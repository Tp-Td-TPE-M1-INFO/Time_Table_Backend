require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');

require('./config/db')
const app = express();
const halls_routes = require('./routes/hall.routes.js')


app.use(express.json())
app.use(cors());

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listen on port ${port}`)
})