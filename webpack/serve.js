const express = require('express');
const { join } = require('path');

const app = express();
const port = 3000;

app.use(express.static(join(__dirname, '../public')));
app.use(express.static('./dist'));

app.listen(port, () => console.log(`App running on ${port}.`));
