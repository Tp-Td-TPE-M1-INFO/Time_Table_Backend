require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

require('./config/db');
const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.use('/api', require('./routes/ue.routes'));
app.use('/api', require('./routes/class.routes'));
app.use('/api', require('./routes/level..routes'));
app.use('/api', require('./routes/sector.routes'));
app.use('/api', require('./routes/course.route'));
app.use('/api', require('./routes/otherEvent.routes'));
app.use('/api', require('./routes/student.routes'));
app.use('/api', require('./routes/teacher.routes'));
app.use('/api', require('./routes/hall.routes.js'));

app.get("/", (req, res) =>{
    res.setHeader("Access-control-credential","true");
    res.send("api is runnig")
})
app.use(express.static(__dirname +'/public'));

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`listen on port ${port}`);
})