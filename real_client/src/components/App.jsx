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
        playerNumber: null,
        socketId: '',
        msg: '',
        ready: false,
        alert: false,
        timer: 30
      };
      this.rock = this.rock.bind(this);
      this.paper = this.paper.bind(this);
      this.scissors = this.scissors.bind(this);
      this.socket = socketIOClient(this.state.endpoint);
    }
    
    componentDidMount() {
        this.socket.on('playerHasConnected', (data) => {
          // console.log(data, 'DAATTAAAA');    
          // console.log(temp, 'temp')
          this.setState({playerNumber: data.playerNumber,
                        socketId: data.socketId, 
                        msg: data.msg});
          let temp = true;
          this.setState({alert: temp});
          
        })       
          
        this.socket.on("bothPlayersReady", (data) => {
          let temp = true;
          this.setState({ready: temp});
        })
    }

    rock(){
      let temp = 'rock';
      this.socket.emit('selection', {
        socketId: this.state.socketId,
        playerNumber: this.state.playerNumber, 
        selection: temp, 
      }); 
      this.setState({selection: temp});
    }
    paper(){
      let temp = 'paper';
      this.socket.emit('selection', {
        socketId: this.state.socketId,
        playerNumber: this.state.playerNumber, 
        selection: temp, 
      }); 
      this.setState({selection: temp});
    }
    scissors(){
      let temp = 'scissors';
      this.socket.emit('selection', {
        socketId: this.state.socketId,
        playerNumber: this.state.playerNumber, 
        selection: temp, 
      }); 
      this.setState({selection: temp});
    }

    winner() {
      this.socket.on('winner', function(data){
        this.setState({winner: data});
      })
    }

    render() {
        return(
            <div className={style.container}>
              <div className={style.playerOne}>
                {(!this.state.alert && this.state.playerNumber === "1") ? alert('Welcome Player One!') : ''}
                <div className={style.playerOneText}>PLAYER ONE</div><br/>
                <img src = "https://s3-us-west-1.amazonaws.com/table-it/sheldon_bag.gif"></img>

                <button onClick={this.rock} >rock</button>
                <button onClick={this.paper}>paper</button>
                <button onClick={this.scissors}>scissors</button>
                <div> 
                    <button className={style.button} onClick={this.ready}> Ready </button>
                </div>
              </div>
              <div className={style.spaceContainer}>
                
              </div>
              <div className={style.playerTwo}>
                {(!this.state.alert && this.state.playerNumber === "2") ? alert('Welcome Player Two!')  : ''} 
                <div className={style.playerTwoText}>PLAYER TWO</div><br/>
                <img src = "https://s3-us-west-1.amazonaws.com/table-it/sheldon_RPSLS.gif"></img>

                <button onClick={this.rock} >rock</button>
                <button onClick={this.paper}>paper</button>
                <button onClick={this.scissors}>scissors</button>
                <div> 
                    <button className={style.button} onClick={this.ready}> Ready </button>
                </div>
                
              </div>


            </div>
            
        )
    }
}
export default App;