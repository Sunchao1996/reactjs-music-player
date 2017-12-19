import React from 'react';
import Progress from './progress';
import '../../stylesheets/palyer.less';
import PubSub from 'pubsub-js';
import {Link} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

let duration = null;
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bar: 0, isPlay: true};
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                bar: e.jPlayer.status.currentPercentAbsolute,
                volumn: e.jPlayer.options.volume * 100,
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            });
        })
    }

    formatTime(time) {
        time = Math.floor(time);
        let miniute = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return `${miniute}:${(seconds < 10 ? '0' + seconds : seconds)}`;
    }

    changeVolumn(volume) {

        $("#player").jPlayer('volume', volume);
    }

    changeProgress(progress) {
        $("#player").jPlayer("play", duration * progress);
        this.setState({
            isPlay: true,
            bar: progress*100
        });
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    play() {
        if (this.state.isPlay) {
            $("#player").jPlayer('pause');
        } else {
            $("#player").jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    }
    changeRepeat(){
        PubSub.publish("CHANGE_REPEAT");
    }
    prev(){
        PubSub.publish("PLAY_PREV");
    }
    next(){
        PubSub.publish("PLAY_NEXT");
    }

    render() {
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusic.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusic.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">-{this.state.leftTime}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                                <div className="volume-wrapper">
                                    <Progress progressColor="#aaa" bar={this.state.volumn}
                                              changeProgress={this.changeVolumn.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px'}}>
                            <Progress bar={this.state.bar} changeProgress={this.changeProgress.bind(this)}/>
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.prev}></i>
                                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`}
                                   onClick={this.play.bind(this)}></i>
                                <i className="icon next ml20" onClick={this.next}></i>
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img src={this.props.currentMusic.cover}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;