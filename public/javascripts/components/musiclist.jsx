import React from 'react';
import MusicListItem from './musiclistitem';
class MusicList extends React.Component {
    render() {
        return (
            <ul>
                {
                    this.props.items.map(function (item) {
                        return (<MusicListItem key={item.id} item={item} focus={this.props.currentMusic === item}/>);
                    }.bind(this))
                }
            </ul>
        );
    }
}

export default MusicList;