import React from 'react';
import Header from '../../components/header';
import {MUSIC_LIST} from '../../data/config';
import Player from '../../components/player';
import PubSub from 'pubsub-js';
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items:MUSIC_LIST,
            currentMusic:MUSIC_LIST[0],
            repeatType: 'cycle'
        }
    }
    componentDidMount(){
        $('#player').jPlayer({
            supplied:"mp3",
            wmode:"window",
            useStateClassSkin:true
        });
        this.playMusic(this.state.items[0]);
        let repeatList = [
            'cycle',
            'once',
            'random'
        ];
        PubSub.subscribe("CHANGE_REPEAT",()=>{
            let index = repeatList.indexOf(this.state.repeatType);
            index = (index + 1)%repeatList.length;
            this.setState({
                repeatType:repeatList[index]
            })
        })
        PubSub.subscribe("PLAY_PREV",()=>{
            console.log("PLAY_PREV")
        });
        PubSub.subscribe("PLAY_NEXT",()=>{
            console.log("PLAY_NEXT")
        });
    }
    componentWillUnmount(){
        PubSub.unsubscribe("PLAY_PREV");
        PubSub.unsubscribe("PLAY_NEXT");
        PubSub.unsubscribe("CHANGE_REPEAT");
    }
    playMusic(item){
        $('#player').jPlayer('setMedia',{
            mp3:item.file
        }).jPlayer('play');
        this.setState({
            currentMusic:item
        });
    }
    render() {
        return (
            <div>
                <Header/>
                <Player currentMusic={this.state.currentMusic} repeatType={this.state.repeatType}/>
            </div>
        );
    }
}
export {App as default}
