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
      if (this.state.time > 0) {
        this.setState({
          time: this.state.time-1
        });
      }
    }
  
    render() {
      return (
        <div className = {style.clock}>

          <h2>{this.state.time}</h2>


          <div className={style.spaceContainer}>
                {this.state.winner ? (this.state.winner.winnerChoice + ' beats ' + this.state.winner.loserChoice + '!') : ''} 
                <br/>
                {this.state.winner ? ('Player ' + this.state.winner.winner + ' wins!') : ''}
              </div>
        </div>

        
      );
    }
  }

  export default Clock;