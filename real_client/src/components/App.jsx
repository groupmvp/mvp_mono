import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
import style from "./styles/App.css";
import Clock from "./Clock.jsx";
import WaitingList from './WaitingList.jsx';
import stylesWait from './styles/WaitingList.css';

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
        timer: 30,
        winner: null,
        queue: ['jeremy', 'beremy', 'kevin'],
      };
      this.rock = this.rock.bind(this);
      this.paper = this.paper.bind(this);
      this.scissors = this.scissors.bind(this);
      this.lizard = this.lizard.bind(this);
      this.spock = this.spock.bind(this);
      this.winner = this.winner.bind(this);
      this.bothPlayersReady = this.bothPlayersReady.bind(this)
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
          this.winner();
          this.bothPlayersReady();
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

    lizard(){
      let temp = 'lizard';
      this.socket.emit('selection', {
        socketId: this.state.socketId,
        playerNumber: this.state.playerNumber, 
        selection: temp, 
      }); 
      this.setState({selection: temp});
    }

    spock(){
      let temp = 'spock';
      this.socket.emit('selection', {
        socketId: this.state.socketId,
        playerNumber: this.state.playerNumber, 
        selection: temp, 
      }); 
      this.setState({selection: temp});
    }

    winner() {
      this.socket.on('winner', (data) => {
        console.log(data, 'WINNNNNEEERRRRRR');
        let temp = data;
        this.setState({winner: temp});
      })
    }

    bothPlayersReady() {
      this.socket.on('bothPlayersReady', (data) => {
        console.log(data, 'Both Players Ready');
        let temp = data;
        this.setState({ready: temp});
      })
    }

    render() {
        return(
          <div>
            <div className={style.container}>
              <div className={style.playerOne}>
                {/* {(!this.state.alert && this.state.playerNumber === "1") ? alert('Welcome Player One!') : ''} */}
                <div className={style.playerOneText}>PLAYER ONE<br/>
                  <img src = "https://s3-us-west-1.amazonaws.com/table-it/sheldon_bag.gif"></img>
                  <div className = {style.buttonBox}>

                    <button className ={style.button} onClick={this.rock} >rock</button>
                    <button className ={style.button} onClick={this.paper}>paper</button>
                    <button className ={style.button} onClick={this.scissors}>scissors</button>
                    <button className ={style.button} onClick={this.lizard}>lizard</button>
                    <button className ={style.button} onClick={this.spock}>spock</button>
                  </div>
                </div>
              </div>
              <div className={style.spaceContainer}>
                {this.state.winner ? (this.state.winner.winnerChoice + ' beats ' + this.state.winner.loserChoice + '!') : ''} 
                <br/>
                {this.state.winner ? ('Player ' + this.state.winner.winner + ' wins!') : ''}
                <Clock />
              </div>
              <div className={style.playerTwo}>
                {/* {(!this.state.alert && this.state.playerNumber === "2") ? alert('Welcome Player Two!')  : ''}  */}
                <div className={style.playerTwoText}>PLAYER TWO<br/>
                  <img src = "https://s3-us-west-1.amazonaws.com/table-it/sheldon_RPSLS.gif"></img>
                  <div className = {style.buttonBox}>
                    <button className ={style.button} onClick={this.rock} >rock</button>
                    <button className ={style.button} onClick={this.paper}>paper</button>
                    <button className ={style.button} onClick={this.scissors}>scissors</button>
                    <button className ={style.button} onClick={this.lizard}>lizard</button>
                    <button className ={style.button} onClick={this.spock}>spock</button>
                  </div>
                </div>
              </div>
              </div>
              <div className={stylesWait.container}>
                  <div className={stylesWait.title}>Waiting List</div>
                  <WaitingList queue={this.state.queue}/>
              </div>
          </div>
        )
    }
}
export default App;