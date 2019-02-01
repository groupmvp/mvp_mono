import React from 'react';
import ReactDOM from 'react-dom';
import style from "./styles/Clock.css";


class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          time: 30
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
      this.setState({
        time: this.state.time-1
      });
    }
  
    render() {
      return (
        <div className = {style.clock}>

          <h2>{this.state.time}</h2>
        </div>
      );
    }
  }

  export default Clock;