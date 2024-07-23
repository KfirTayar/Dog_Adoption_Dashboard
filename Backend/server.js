const Koa = require('koa');
const mongoose = require('mongoose');
const dogRoutes = require('./routes/routes');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const dotenv = require('dotenv');

const server = new Koa();

dotenv.config();

mongoose.connect(process.env.LOCAL_MONGODB_CONNECTION_STRING);

// Checking if the DB is/isn't connected
const db = mongoose.connection;
db.on('error', function() {console.log('The DB is not connected!')});
db.once('open', function() {console.log('The DB is connected!')});

server.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true,
}));

server.use(koaBody({
    multipart: true,
    urlencoded: true,
    json: true,
}));

server.use(dogRoutes.routes());
server.use(dogRoutes.allowedMethods());

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});