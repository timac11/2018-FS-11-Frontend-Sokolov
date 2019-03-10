export default ((self) => {
    const ports = [];
    /**
     * Global state application
     * is copy of state of application
     */
    const GLOBAL_APP_STATE = {
        /**
         * Contains array of messages
         */
        chats: [],
        /**
         * Contains (key, value) key is id of chat
         */
        messages: new Map()
    };

    const BASE_ENDPOINT = 'http://localhost:8081/api';

    self.origin = 'http://localhost:8080';

    const getChats = () => {
        let chats = GLOBAL_APP_STATE.chats;
        return new Promise((res, rej) => {
            if (chats && chats.length) {
                res(chats);
            } else {
                _execute(BASE_ENDPOINT + '/chats')
                    .then((chats) => {
                        GLOBAL_APP_STATE.chats = chats;
                        res(chats);
                    })
                    .catch((error) => rej(error));
            }
        });
    };

    const getChat = (id) => {
        let chat = GLOBAL_APP_STATE.messages.get(id);
        return new Promise((res, rej) => {
            if (chat) {
                res({messages: chat, id: id});
            } else {
                // TODO remove hardcoded value
                _execute(BASE_ENDPOINT + '/chats/' + id)
                    .then((chat) => {
                        GLOBAL_APP_STATE.messages.set(id, chat.messages);
                        res(chat);
                    })
                    .catch((error) => rej(error));
            }
        });
    };

    const addMessage = (chatId, message) => {
        let chat = GLOBAL_APP_STATE.messages.get(chatId);
        return new Promise((res, rej) => {
            let formData = new FormData();
            if (message.type !== 'text') {
                formData.set('file', message.file)
            } else {
                formData.set('text', message.text)
            }
            //TODO change this method
            _execute(BASE_ENDPOINT + '/message', 'POST', formData)
                .then((response) => {
                    const message1 = {text: message.text, id: Math.random()};
                    GLOBAL_APP_STATE.messages.set(chatId, chat.concat(message));
                    res(message1);
                })
                .catch((error) => rej(error));
        });
    };

    /**
     * Initialize listeners
     */

    self.addEventListener('connect', (event) => {
        const port = event.source;
        ports.push(port);
        port.addEventListener('message', (event) => {
            if (event.data === 'disconnect') {
                ports.splice(ports.indexOf(event.target), 1);
            } else if (event.data.type === 'getChats') {
                getChats()
                    .then((chats) => {
                        port.postMessage({type: 'chats', data: chats})
                    });
            } else if (event.data.type === 'getChat') {
                console.log(event.data.chatId);
                getChat(event.data.chatId)
                    .then((chat) => {
                        port.postMessage({type: 'chat', data: chat});
                    })
            } else if (event.data.type === 'addMessage') {
                addMessage(event.data.chatId, event.data.message)
                    .then((message) => {
                        ports.forEach((port) => {
                            port.postMessage({type: 'message', data: message});
                        });
                    })
            }
        });
        port.start();
    });

    const _execute = (url, method, body, headers) => {
        let config = {};
        config.method = method || 'GET';
        config.headers = headers || {};
        if (method === 'POST') {
            config.body = body;
        }
        return new Promise((res, rej) => {
            fetch(url, config)
                .then((response) => {
                    return response.text()
                })
                .then((text) => {
                    console.log(text);
                    res(JSON.parse(text));
                })
                .catch(() => (rej('Error occurred')));
        });
    };
});