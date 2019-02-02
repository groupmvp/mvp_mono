import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
import style from "./styles/App.css";
import Clock from "./Clock.jsx";
import WaitingList from './WaitingList.jsx';
import stylesWait from './styles/WaitingList.css';
import Chat from './styles/Chat.css'

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
      this.gameReset = this.gameReset.bind(this);
      this.socket = socketIOClient(this.state.endpoint);
    }
    
    componentDidMount() {
        this.socket.on('playerHasConnected', (data) => {
          console.log(data, 'playerHasConnected');    
          // console.log(temp, 'temp')
          this.setState({playerNumber: data.playerNumber,
                        socketId: data.socketId, 
                        msg: data.msg});
          let temp = true;
          
          this.setState({alert: temp});
          this.winner();
          this.bothPlayersReady();
        })       
          
        // this.socket.on("bothPlayersReady", (data) => {
        //   let temp = true;
        //   this.setState({ready: temp});
        // })
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
        let temp = true;
        this.setState({ready: temp});
        
      })
    }

    gameReset() {
      let temp = null;
      let bool = false;
      let str = '';
      this.setState({
        data: temp,
        selection: temp, 
        playerNumber: temp,
        socketId: str,
        msg: str,
        alert: bool,
        winner: temp
      })

    }

    render() {
        return(
          <div>
            <div className={style.container}>
              <div className={style.playerOne}>
                {/* {(!this.state.alert && this.state.playerNumber === "1") ? alert('Welcome Player One!') : ''} */}
                <div className={style.playerOneText}>PLAYER ONE<br/>
                  <div className={style.playerOneImg}><img src = "https://s3-us-west-1.amazonaws.com/table-it/sheldon_bag.gif"></img></div>
                  <div className = {style.buttonBox}>
                    {this.state.playerNumber === "1" ? <button className ={style.button} onClick={this.rock} >rock</button> : <button className ={style.buttonDisabled} disabled>rock</button>}
                    {this.state.playerNumber === "1" ? <button className ={style.button} onClick={this.paper} >paper</button> : <button className ={style.buttonDisabled} disabled>paper</button>}
                    {this.state.playerNumber === "1"? <button className ={style.button} onClick={this.scissors} >scissors</button> : <button className ={style.buttonDisabled} disabled>scissors</button>}
                    {this.state.playerNumber === "1"? <button className ={style.button} onClick={this.lizard} >lizard</button> : <button className ={style.buttonDisabled} disabled>lizard</button>}
                    {this.state.playerNumber === "1"? <button className ={style.button} onClick={this.spock} >spock</button> : <button className ={style.buttonDisabled} disabled>spock</button>}
                  </div>
                </div>
              </div>
              <div className={style.spaceContainer}>
                <Clock 
                ready = {this.state.ready} 
                winner = {this.state.winner}
                socketId = {this.state.socketId}
                socket = {this.socket}
                gameReset = {this.gameReset}
                selection = {this.state.selection}
                playerNumber = {this.state.playerNumber}
                />
              </div>
              <div className={style.playerTwo}>
                {/* {(!this.state.alert && this.state.playerNumber === "2") ? alert('Welcome Player Two!')  : ''}  */}
                <div className={style.playerTwoText}>PLAYER TWO<br/>
                  <img src = "https://s3-us-west-1.amazonaws.com/table-it/sheldon_RPSLS.gif"></img>
                  <div className = {style.buttonBox}>
                  {this.state.playerNumber === "2" ? <button className ={style.button} onClick={this.rock} >rock</button> : <button className ={style.buttonDisabled} disabled>rock</button>}
                    {this.state.playerNumber === "2" ? <button className ={style.button} onClick={this.paper} >paper</button> : <button className ={style.buttonDisabled} disabled>paper</button>}
                    {this.state.playerNumber === "2"? <button className ={style.button} onClick={this.scissors} >scissors</button> : <button className ={style.buttonDisabled} disabled>scissors</button>}
                    {this.state.playerNumber === "2"? <button className ={style.button} onClick={this.lizard} >lizard</button> : <button className ={style.buttonDisabled} disabled>lizard</button>}
                    {this.state.playerNumber === "2"? <button className ={style.button} onClick={this.spock} >spock</button> : <button className ={style.buttonDisabled} disabled>spock</button>}

                  </div>
                </div>
              </div>
              </div>
              <div className={stylesWait.container}>
                  <div className={stylesWait.title}>Waiting List</div>
                  <WaitingList queue={this.state.queue}/>
              </div>

              {/* <div>
                <Chat />
              </div> */}

          </div>
        )
    }
}
export default App;