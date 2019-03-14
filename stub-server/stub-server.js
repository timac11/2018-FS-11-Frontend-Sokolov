const MessageController = require('./controller/message');
const ChatController  = require('./controller/chat');

const express = require('express');
const expressFileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');

const port = '8081';

app.use(cors());
app.use(expressFileUpload());

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

