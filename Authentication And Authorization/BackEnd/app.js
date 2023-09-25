const express = require("express");
const app = express();
const PORT = 4500;
require('./Config/Db');
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const UserRoute= require('./Routers/UserRoute')
app.use('/',UserRoute)


app.listen(PORT, () => console.log("Server running on port " + PORT));