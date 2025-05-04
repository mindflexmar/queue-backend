const Fastify = require('fastify');
const cors = require('@fastify/cors');
const routes = require('./routes');

const app = Fastify({ logger: true });

app.register(cors);
app.register(routes); 

module.exports = app;
