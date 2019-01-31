import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
import style from "./styles/App.css";

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        endpoint: "http://127.0.0.1:3000",
        selection: null, 
        winner: this.socket.on('winner', function(data){
            this.setState({winner: data});
        })
      };
      this.rock = this.rock.bind(this);
      this.paper = this.paper.bind(this);
      this.scissors = this.scissors.bind(this);
      this.socket = socketIOClient(this.state.endpoint);
    }
    
    componentDidMount() {
        this.socket.on('playerHasConnected', function(data) {
          console.log(data, 'DAATTAAAA');    
        })
        this.winner()
    }

    rock(){
      this.socket.emit('clicked', 'rock');
      this.socket.on("selection", function(data) {
          console.log(data)
      });  
    }
    paper(){
      this.socket.emit('clicked', 'paper');
      this.socket.on("selection", function(data) {
        console.log(data)
      });
    }
    scissors(){
      this.socket.emit('clicked', 'scissors');
      this.socket.on("selection", function(data) {
        console.log(data)
      });
    }

    ready(){

    }
    // this.socket.on('winner')

    winner() {
      this.socket.on('winner', function(data){
        this.setState({winner: data});
      })
    }

    render() {
        return(
            <div>
                <button onClick={this.rock} >rock</button>
                <button onClick={this.paper}>paper</button>
                <button onClick={this.scissors}>scissors</button>
                <div> 
                    <button onClick={this.ready}> Ready </button>
                </div>
            </div>
            
        )
    }
}
export default App;