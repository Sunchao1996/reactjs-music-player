import React from 'react';
import Header from '../../components/header';
import {MUSIC_LIST} from '../../data/config';
import PropTypes from 'prop-types';
import PubSub from 'pubsub-js';
import PureRenderMixin from 'react-addons-pure-render-mixin';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: MUSIC_LIST,
            currentMusic: MUSIC_LIST[0],
            repeatType: 'cycle',
            detail:MUSIC_LIST
        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        $('#player').jPlayer({
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });
        this.playMusic(this.state.items[0]);
        let repeatList = [
            'cycle',
            'once',
            'random'
        ];

        $("#player").bind($.jPlayer.event.ended, (e) => {
            let repeat = this.state.repeatType;
            if(repeat === "once"){
                this.playMusic(this.state.currentMusic)
            }else if(repeat === "random"){

            }else{
                PubSub.publish('PLAY_NEXT')
            }
        });
        PubSub.subscribe("CHANGE_REPEAT", () => {
            let index = repeatList.indexOf(this.state.repeatType);
            index = (index + 1) % repeatList.length;
            this.setState({
                repeatType: repeatList[index]
            })
        });
        PubSub.subscribe("DEL_MUSIC", (msg, item) => {
            this.setState(
                {
                    items: this.state.items.filter(function (temp) {
                        return temp !== item;
                    })
                }
            );
        })
        PubSub.subscribe("PLAY_MUSIC", (msg, item) => {
            this.playMusic(item);
        })
        PubSub.subscribe("PLAY_PREV", () => {
            let cm = this.state.currentMusic;
            let cIndex = this.state.items.indexOf(cm);
            let length = this.state.items.length;
            let prevIndex = (cIndex+(length-1) )%length;
            console.log(cIndex,prevIndex)
            this.setState({
               currentMusic:this.state.items[prevIndex]
            });
            this.playMusic(this.state.currentMusic);
        });
        PubSub.subscribe("PLAY_NEXT", () => {
            let cm = this.state.currentMusic;
            let cIndex = this.state.items.indexOf(cm);
            let length = this.state.items.length;
            let prevIndex = (cIndex+1)%length;
            console.log(cIndex,prevIndex)
            this.setState({
                currentMusic:this.state.items[prevIndex]
            });
            this.playMusic(this.state.currentMusic);
        });
        PubSub.subscribe("DETAIL_ITEM", (msg, item) => {
            this.setState(
                {
                    detail: item
                },function(){

                    //错误警告 [react-router] `props.history` and `context.history` are deprecated. Please use `context.router`
                    //this.props.history.push('/detail');
                    this.context.router.push('/detail');
                }
            );
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe("PLAY_PREV");
        PubSub.unsubscribe("PLAY_NEXT");
        PubSub.unsubscribe("CHANGE_REPEAT");
        PubSub.unsubscribe("DEL_MUSIC");
        PubSub.unsubscribe("PLAY_MUSIC");
        PubSub.unsubscribe("DETAIL_ITEM");
    }

    playMusic(item) {
        $('#player').jPlayer('setMedia', {
            mp3: item.file
        }).jPlayer('play');
        this.setState({
            currentMusic: item
        });
    }

    render() {
        return (
            <div>
                <Header/>
                {/*<Player currentMusic={this.state.currentMusic} repeatType={this.state.repeatType}/>*/}
                {/*<MusicList items={this.state.items} currentMusic={this.state.currentMusic}/>*/}
                {React.cloneElement(this.props.children, this.state)}
            </div>
        );
    }

}
App.contextTypes = {
    router: PropTypes.object
}
export {App as default}
