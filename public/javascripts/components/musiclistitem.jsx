import React from 'react';
import PubSub from 'pubsub-js';

import deleteIcon from '../../fonticon/delete.png';
import playIcon from '../../fonticon/paly.png';
import PureRenderMixin from 'react-addons-pure-render-mixin';
class MusicListItem extends React.Component {
    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    playMusic(item, e) {
        PubSub.publish('PLAY_MUSIC', item)
    }

    removeMusic(item, e) {
        e.stopPropagation();
        PubSub.publish('DEL_MUSIC', item)
    }

    detailHandle(item,e){
        e.stopPropagation();
        e.preventDefault();
        PubSub.publish('DETAIL_ITEM',item);
    }
    render() {
        let item = this.props.item;
        return (
            <li className={`row components-listitem${this.props.focus ? ' focus' : ''}`}>
                <p ><span className="bold" style={{cursor: 'pointer'}} onClick={this.detailHandle.bind(this,item)}>{item.title}</span>-{item.artist}</p>
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