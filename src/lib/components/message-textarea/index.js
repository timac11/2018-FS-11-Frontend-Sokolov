import shadow from './shadow.css';
import FileInput from   './file-input'

const template = `
        <style>${shadow.toString()}</style>
            <textarea class="textarea" placeholder="Message"></textarea>
            <button>Send</button>
            <file-input></file-input>
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
        var textMessage = this._elements.textarea.value;
        if (textMessage !== '') {
            this.dispatchEvent(new CustomEvent('messagesended', {
                detail: {
                    message: this._elements.textarea.value
                }
            }));
            this.clearTextArea();
        }
    }

    clearTextArea() {
        this._elements.textarea.value = '';
    }
}

customElements.define('message-textarea', MessageTextarea);

export default MessageTextarea;
