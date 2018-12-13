const basePath = '/api';
const chats = require('../data/chats');
const chat = require('../data/chat');

class ChatController {
    constructor(app) {
        this.initEndpoints(app);
    }

    initEndpoints(app) {
        app.get(basePath + '/chats', (req, res) => {
            res.send(chats);
        });
        app.get(basePath + '/chats/:chatId', (req, res) => {
            res.send(chat);
        })
    }
}

module.exports = ChatController;