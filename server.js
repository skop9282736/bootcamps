const express = require('express');
const dotenv = require('dotenv');
const bootcampRoutes = require('./routes/bootcamps.route');
const { logger } = require('./middleware/logger.middleware');

const app = express();

app.use(logger);

// load env file
dotenv.config({ path: './config/config.env' });

const port = process.env.PORT || 5000;

// Routes
app.use('/api/v1/bootcamps', bootcampRoutes);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
