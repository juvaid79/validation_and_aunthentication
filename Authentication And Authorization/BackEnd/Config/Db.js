const mongoose = require('mongoose');
const mongouri = "mongodb://localhost:27017/AuthenticateAndValidate";

mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database Connected Successfully!');
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});



