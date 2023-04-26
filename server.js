require('dotenv').config({path:'./config/.env'});
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorhandler');

require('./config/db')
const app = express();
app.use(express.json())
app.use(cors());
app.use(errorHandler);

app.use('/api', require('./routes/ue.routes'));
app.use('/api', require('./routes/class.routes'));
app.use('/api', require('./routes/level..routes'));
app.use('/api', require('./routes/sector.routes'));

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`listen on port ${port}`)
})