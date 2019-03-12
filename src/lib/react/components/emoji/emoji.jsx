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
        const emojiShow = this.state.emojiShow;
        const style = emojiShow ? {display: 'flex'} : {display: 'none'};
        return (
            <span>
                <button className="send-button" onClick={() => {
                    this.setState((state) => ({
                        emojiShow: !state.emojiShow
                    }));
                }}>
                    Emoji
                </button>
                <div className='emoji-base' style={style}>
                    {this.renderEmojis.bind(this)()}
                </div>
            </span>
        )
    }

    renderEmojis () {
        return emojiArray.map((emoji) => {
            return <span
                key={emoji}
                className={emoji.concat(' emoji')}
                onClick={() => {
                        this.props.emojiClick(emoji);
                        this.setState({
                            emojiShow: false
                        });
                    }
                }
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

export default Emoji;