import './index.css';
import MessageTextarea from '../lib/components/message-textarea';
import MessageWrapper from '../lib/components/messages-wrapper'


const messageTextarea = new MessageTextarea();
const messageWrapper = new MessageWrapper();

document.body.appendChild(messageWrapper);
document.body.appendChild(messageTextarea);

messageTextarea.addEventListener('messagesended', function (event) {
    messageWrapper.addMessage(event.detail.message);
});