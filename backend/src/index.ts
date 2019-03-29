import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import config from './config';
import db from './db';
import shoppingListRoutes from './route/shopping-list';
import userRoutes from './route/user';
import log from './util/logger';

// Have to do something with the db object
// to initialize the models correctly
db.isDefined('user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/shopping-list', shoppingListRoutes);

app.listen(config.http.port, () => log.info(`Shopping list app listening on port ${config.http.port}!`));
