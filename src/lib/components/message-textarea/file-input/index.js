import shadowStyles from './shadow.css';
import MessageTextarea from "../index";

const template = `
	<style>${shadowStyles.toString()}</style>
	<slot name="before"></slot>
	<input type="file"/>
	<slot name="after"></slot>
`;

class FileInput extends HTMLElement{
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = template;
        this._initElements();
        this._customizeInput();
        this._addStyles();
    }

    _initElements () {
        var hiddenInput = document.createElement('input');
        var input = this.shadowRoot.querySelector('input');
        this.appendChild(hiddenInput);
        this._elements = {
            input: input,
            hiddenInput: hiddenInput
        }
    }

    _customizeInput () {
        const input = this._elements.input;
        const label = document.createElement('label');
        input.type = 'file';
        input.parentNode.insertBefore(label, input);
        label.appendChild(input);
    }

    _addStyles () {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(shadowStyles));
        this.shadowRoot.appendChild(style);
    }
}

customElements.define('file-input', FileInput);

export default FileInput;