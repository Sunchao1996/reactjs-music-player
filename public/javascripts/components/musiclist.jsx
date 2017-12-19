import React from 'react';
import '../../stylesheets/musiclistitem.less';
import Footer from './footer'
import MusicListItem from './musiclistitem';
import PureRenderMixin from 'react-addons-pure-render-mixin';
class MusicList extends React.Component {
    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.items.map(function (item) {
                            return (
                                <MusicListItem history={this.props.history} key={item.id} item={item} focus={this.props.currentMusic === item}/>);
                        }.bind(this))
                    }
                </ul>
                <Footer/>
            </div>
        );
    }
}

export default MusicList;