import React from 'react';
import '../../stylesheets/progress.less';
class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bar: 0
        };
    }

    changeProgress(e) {

        var progressParent = this.progress;
        var progress = (e.clientX - progressParent.getBoundingClientRect().left ) / progressParent.clientWidth;
        this.props.changeProgress && this.props.changeProgress(progress)
    }

    render() {
        return (<div className="components-progress" ref={(e) => this.progress = e}
                     onClick={this.changeProgress.bind(this)}>
            <div className="progress"
                 style={{background: `${this.props.progressColor}`, width: `${this.props.bar}%`}}></div>
        </div>);
    }
}
Progress.defaultProps = {
    progressColor: '#2f9842',
}

export default Progress;