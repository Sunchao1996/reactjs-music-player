import React from 'react';
import PubSub from 'pubsub-js';

import deleteIcon from '../../fonticon/delete.png';
import playIcon from '../../fonticon/paly.png';

class MusicListItem extends React.Component {
    playMusic(item, e) {
        PubSub.publish('PLAY_MUSIC', item)
    }

    removeMusic(item, e) {
        e.stopPropagation();
        PubSub.publish('DEL_MUSIC', item)
    }

    render() {
        let item = this.props.item;
        return (
            <li className={`row components-listitem${this.props.focus ? ' focus' : ''}`}>
                <p ><span className="bold" style={{cursor: 'pointer'}}>{item.title}</span>-{item.artist}</p>
                <p className="-col-auto"
                   style={{width: '20px', height: '20px', paddingRight: '20px', paddingBottom: '10px'}}
                   onClick={this.playMusic.bind(this, item)}>
                    <img className="playIcon" src={playIcon} style={{width: '20px', height: '20px'}}/>
                </p>
                <p className="-col-auto delete" onClick={this.removeMusic.bind(this, item)}>
                    <img className="deleteIcon" src={deleteIcon} style={{width: '100%', height: '100%'}}/>

                </p>
            </li>
        );
    }
}

export default MusicListItem;