// import React from 'react';
// import ReactDOM from 'react-dom';
// import style from "./styles/Clock.css";

// class Clock extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         count: 30
//       }
//     }
    
//     componentDidMount() {
      
//     }

 
//     render() {
//         return(
//             <div className={style.clock}>

//             </div>            
//         )
//     }
// }
// export default Clock;
import React from 'react';
import ReactDOM from 'react-dom';
import style from "./styles/Clock.css";


class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          date: 30
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
        date: this.state.date-1
      });
    }
  
    render() {
      return (
        <div className = {style.clock}>

          <h2>{this.state.date}</h2>
        </div>
      );
    }
  }

  export default Clock;