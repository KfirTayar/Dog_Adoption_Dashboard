const Koa = require('koa');
const mongoose = require('mongoose');
const routes = require('./routes/routes'); // Ensure this path is correct
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');

const server = new Koa();

mongoose.connect('mongodb://localhost:27017/adoptadog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

server.use(cors({
    origin: '*', // Allow all origins; change to specific origin in production
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
    allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Specify allowed headers
    credentials: true, // Allow cookies to be sent with requests
}));

server.use(koaBody({
    multipart: true, // Support file uploads
    urlencoded: true,
    json: true,
}));

server.use(routes.routes());
server.use(routes.allowedMethods());

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});