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
                _get(BASE_ENDPOINT + '/chats')
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
                res(chat);
            } else {
                _get(BASE_ENDPOINT + '/chats/1')
                    .then((chat) => {
                        GLOBAL_APP_STATE.messages.set(id, chat);
                        res(chat);
                    })
                    .catch((error) => rej(error));
            }
        });
    };

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
                getChat(event.data.chatId)
                    .then((chat) => {
                        port.postMessage({type: 'chat', data: chat});
                    })
            }
        });
        port.start();
    });

    const _get = (url) => {
        return new Promise((res, rej) => {
            fetch(url, {headers: {}})
                .then((response) => {
                    return response.text()
                })
                .then((text) => {
                    console.log(text);
                    res(JSON.parse(text));
                })
                .catch(() => (rej('Error occurred')));
        })
    }
});