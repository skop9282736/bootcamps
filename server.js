const express = require('express');
const dotenv = require('dotenv');

const app = express();

// load env file
dotenv.config({ path: './config/config.env' });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
