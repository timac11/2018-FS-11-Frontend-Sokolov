import shadow from './shadow.css';

const template = `
        <style>${shadow.toString()}</style>
        <div class="active-window-body"></div>
        `;

class MessagesWrapper extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = template;
        this._initElements();
        this._addHandlers();
    }

    _initElements() {
        const body = this.shadowRoot.querySelector('.active-window-body');
        this._elements = {
            body: body
        };
    }

    _addHandlers() {
        //this._elements.body.addEventListener('messagesended', this._addMessage.bind(this));
        //this.addEventListener('messagesended', this._addMessage.bind(this))
    }

    addMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = message;
        messageElement.className = 'sended-body-message';
        this._elements.body.appendChild(messageElement);
    }
}

customElements.define('messages-wrapper', MessagesWrapper);

export  default MessagesWrapper;
