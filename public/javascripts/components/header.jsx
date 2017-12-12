import React from 'react';
import '../../stylesheets/header.less';
import LogoURL from '../../../views/static/images/logo.png';
class Header extends React.Component {
    render() {
        return (
            <div className="components-logo row">
                <img src={LogoURL} alt="logo" width='40' className="-col-auto"/>
                <h1 className="caption">Music Player Build By React</h1>
            </div>
        );
    }
}
export default Header;