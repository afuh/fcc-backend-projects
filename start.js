/* eslint-disable no-console */
require('dotenv').config({ path: 'variables.env' });

const chalk = require('chalk');
const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(chalk.yellow.bold(`Express running → PORT ${server.address().port}`));
});
