const express = require('express');
const logger = require('./middleware/logger');
var cors = require('cors')
const app = express();

app.use(cors())

// Initialize the middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/meal', require('./routes/api/meal'));

const PORT = 3500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}!!!`));