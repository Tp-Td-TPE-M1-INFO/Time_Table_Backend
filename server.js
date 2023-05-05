require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');

require('./config/db');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname +'/public'));

app.use('/api', require('./routes/student.routes'));
app.use('/api', require('./routes/teacher.routes'));
app.use('/api', require('./routes/hall.routes.js'));

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`listen on port ${port}`);
})