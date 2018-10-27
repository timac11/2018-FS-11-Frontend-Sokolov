import shadow from './shadow.css';

const template = `
        <style>${shadow.toString()}</style>
        <div class="footer">
            <textarea class="textarea" placeholder="Message"></textarea>
            <button>Send</button>
        </div>
        `;

class MessageTextarea extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = template;
        this._initElements();
        this._addHandlers();
    }

    _initElements() {
        const textarea = this.shadowRoot.querySelector('textarea');
        const button = this.shadowRoot.querySelector('button');
        this._elements = {
            textarea: textarea,
            button: button
        };
    }

    _addHandlers() {
        this._elements.button.addEventListener('click', this._onKeyPress.bind(this));
    }

    _onKeyPress(event) {
        console.log('button clicked!')
        this._elements.button.dispatchEvent(new Event('messagesended'));
    }
}

customElements.define('message-textarea', MessageTextarea);