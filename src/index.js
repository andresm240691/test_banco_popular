const express = require('express');
const app = express();

// midddlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('../routes/index'));

app.listen(3000);

