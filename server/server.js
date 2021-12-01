const express = require('express');
const connection = require('./config/db');
const cors = require('cors');
// const path = require('path');
const app = express();
const config = require('config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected !!!")
  });

// ROUTES
app.use("/api/auth", require('./routes/auth'));
app.use("/api/course", require('./routes/course'));
app.use("/api/teacher/auth", require('./routes/teacher-auth'));
app.use("/api/teacher/course", require('./routes/teacher-course'));
app.get('/', (req, res) => {
    res.send("Failed route");
})

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
})