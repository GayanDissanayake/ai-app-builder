const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5050;

// const mongoose = require('mongoose');
// mongoose.connect('your_connection_string')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
