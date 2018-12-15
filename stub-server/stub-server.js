const MessageController = require('./controller/message');
const ChatController  = require('./controller/chat');

const express = require('express');
const expressFileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');

const port = '8081';

app.use(expressFileUpload());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const configureControllers = () => {
    new MessageController(app);
    new ChatController(app);
};

configureControllers();


app.get('/health', (req, res) => {
    res.send('Hello world!');
});

app.post('/api/authorize', (req, res) => {
    res.send({
       userName: 'user',
       token: 12345
    });
});

app.listen(port, () => {
    console.log(`Stub server started in port ${port}`);
});

