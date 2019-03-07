import React, {Component} from 'react';
import './emoji.css'

class Emoji extends Component{
    constructor(props) {
        super(props);
        this.state = {
            emojiShow: props.emojiShow,
            emojiClick: props.emojiClick
        }
    }


    render() {
        const emojiShow = this.props.emojiShow;
        const style = emojiShow ? {display: 'flex'} : {display: 'none'};
        return (
            <div className='emoji-base' style={style}>
                {this.renderEmojis.bind(this)()}
            </div>
        )
    }

    renderEmojis () {
        return emojiArray.map((emoji) => {
            return <span
                key={emoji}
                className={emoji.concat(' emoji')}
                onClick={() => this.props.emojiClick(emoji)}
            />
        })
    }
}

const emojiArray = [
    'blowing-a-kiss',
    'savoring-food',
    'screaming-in-fear',
    'face-vomiting',
    'face-with-hand',
    'face-with-medical',
    'alien',
    'boy',
    'brain',
    'child',
    'detective'
];

const itemClick = (props) => {
    props.history.push('/chats/' + props.id);
};

export default Emoji;