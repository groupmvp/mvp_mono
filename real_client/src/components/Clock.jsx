import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
import style from "./styles/Clock.css";


class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: 15,
        newGameSent: false,
        timeDelay: false,
        nullSent: false
      };
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      if (this.props.ready && this.state.time > 0) {
        this.setState({
          time: this.state.time-1
        });
      }
      if(this.state.time <= 0 && !this.props.selection && !this.state.nullSent ){
        let temp = true;
        this.setState({nullSent: temp});
        if (this.props.playerNumber === "1" || this.props.playerNumber ==="2") {
          this.props.socket.emit('selection', {
            socketId: this.props.socketId,
            playerNumber: this.props.playerNumber, 
            selection: this.props.selection, 
          }); 
        }
      }
    }

    newGame() {
      // setTimeout(() => {
        this.props.socket.emit('newGame', {
        socketId: this.props.socketId
      })
      //after this point this.ready = true
      // )}, 3000); 

        
      let temp = true;
      this.setState({
        newGameSent: temp
      })

      this.props.gameReset()

      this.setState({
        time: 15,
        newGameSent: false,
        timeDelay: false,
        nullSent: false
      })
    }

    timeDelay() {
      setTimeout(() => {
        this.setState({timeDelay: true});
      }, 4000)
    }

    render() {
      return (
        <div className = {style.container}>
          <div className = {style.clock}> 
            {(this.props.winner)? "" : <h2>{this.state.time}</h2>}
            {this.props.winner && !this.state.newGameSent && this.state.timeDelay? this.newGame() : ''}
          </div>

          <div className = {style.text}> 
                {this.props.winner 
                  ?this.props.winner.isTie 
                    ? ((this.props.winner.winnerChoice + ' ties ' + this.props.winner.loserChoice + '!') , this.timeDelay())
                    : ((this.props.winner.winnerChoice + ' beats ' + this.props.winner.loserChoice + '!') , this.timeDelay())
                  : ""
                }

                <br/>
                {this.props.winner 
                  ?this.props.winner.isTie 
                    ?("Its a tie! New Game?")
                    :('Player ' + this.props.winner.winner + ' wins!')
                  : ""
                }

          </div>

        </div>

        
      );
    }
  }

  export default Clock;