const MessageController = require('./controller/message');

const express = require('express');
const expressFileUpload = require('express-fileupload');
const app = express();

const port = '8081';

app.use(expressFileUpload());

const configureControllers = () => {
    new MessageController(app);
};

configureControllers();

app.get('/health', (req, res) => {
    res.send('Hello world!');
});

app.listen(port);

console.log(`app started in port ${port}`);

