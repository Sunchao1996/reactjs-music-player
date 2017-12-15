import React from 'react';
import BackURL from '../../fonticon/back.png'
import {Link} from 'react-router'
class Footer extends React.Component {
    render() {
        return (
            <div className="row footer">
                <div className="-col-auto">
                    <Link to="/"><img src={BackURL} style={{width:'25px',height:'25px'}}/></Link>
                </div>
            </div>
        );
    }
}
export default Footer;