import React from 'react';
import BackURL from '../../fonticon/back.png'
import {Link} from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'
class Footer extends React.Component {
    constructor(props,context){
        super(props,context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="row footer">
                <div className="-col-auto">
                    <Link to={this.props.link}><img src={BackURL} style={{width:'25px',height:'25px'}}/></Link>
                </div>
            </div>
        );
    }
}
Footer.defaultProps = {
    link:'/'
}
export default Footer;