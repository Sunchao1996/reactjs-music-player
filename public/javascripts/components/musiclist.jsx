import React from 'react';
import '../../stylesheets/musiclistitem.less';
import Footer from './footer'
import MusicListItem from './musiclistitem';
class MusicList extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.items.map(function (item) {
                            return (
                                <MusicListItem key={item.id} item={item} focus={this.props.currentMusic === item}/>);
                        }.bind(this))
                    }
                </ul>
                <Footer/>
            </div>
        );
    }
}

export default MusicList;