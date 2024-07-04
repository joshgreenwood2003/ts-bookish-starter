import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import userRoutes from './controllers/userController';
import { sqlController } from './controllers/sqlController';
var bodyParser = require('body-parser');
const port = process.env['PORT'] || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
app.use('/users',userRoutes);
sqlController.Connect();