import React from 'react';
import '../../stylesheets/musiclistitem.less';
import Footer from './footer'
class MusicDetail extends React.Component {
    render() {
        let item = this.props.detail;
        return (
            <div>
                <ul>
                    <li className={`row components-listitem`}>名字：{item.title}</li>
                    <li className={`row components-listitem`}>作者：{item.artist}</li>
                </ul>
                <Footer link="/list"/>
            </div>
        );
    }
}

export default MusicDetail;