const express = require('express');
let app = express();
let path = require('path');
let router = require('./router.js');
const cors = require('cors');
const port = 3000;
const morgan = require('morgan');
const compression = require('compression');

app.use(compression({ threshold: 0 }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(morgan('dev'));
// app.use(express.urlEncoded({ extended: true }))
app.use(cors());
app.use('/api', router);

app.listen(port, () => { console.log(`listening on port ${port}`) });