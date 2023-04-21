const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.set("strictQuery", false);

mongoose.connect(process.env.URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
} 
)
.then(() => console.log("connected to MongoDB"))
.catch((err) => console.log("Failed to connect to MongoDB", err));
