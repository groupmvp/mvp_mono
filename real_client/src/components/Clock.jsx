import React from 'react';
import ReactDOM from 'react-dom';
import style from "./styles/Clock.css";


class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          time: 15
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
    }
  
    render() {
      return (
        <div className = {style.container}>
          <div className = {style.clock}> 
            <h2>{this.state.time}</h2>
          </div>

          <div className = {style.text}> 
                {this.props.winner 
                  ?this.props.winner.isTie 
                    ? (this.props.winner.winnerChoice + ' ties ' + this.props.winner.loserChoice + '!') 
                    : (this.props.winner.winnerChoice + ' beats ' + this.props.winner.loserChoice + '!')
                  : ""
                }

                <br/>
                {this.props.winner 
                  ?this.props.winner.isTie 
                    ?("Its a tie! New Game?")
                    :('Player ' + this.props.winner.winner + ' wins!')
                  : ""
                }
                <br/>
                {/* {this.props.winner 
                  ?this.props.winner.isTie 
                    ? <button className = {style.button}> New Game </button>
                    :('Player ' + this.props.winner.winner + ' wins!')
                  : ""
                } */}

          </div>

        </div>

        
      );
    }
  }

  export default Clock;