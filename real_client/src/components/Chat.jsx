import React from 'react';
import ReactDOM from 'react-dom';
import socketIOClient from "socket.io-client";
import style from "./styles/Chat.css";



class Chat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        endpoint: "http://127.0.0.1:4000"
      };
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint);
        socket.on("chat message", data => this.setState({ data: data }));
    }

    clickHandler(e) {
        e.preventDefault()
        console.log(e.target)
    }


    render() {
        return(
            <div> 
                <ul className={style.messages}></ul>
                <form action="">
                    <input id="m" 
                    placeholder="Type Message Here" 
                    autoComplete="off" 
                    onChange= {e => this.clickHandler(e)}/>

                    <button onClick={e => this.clickHandler(e)}>Send</button>
                </form>
            </div>
        )
    }
}
export default Chat;

// <script>
// $(function () {
//   var socket = io("http://localhost:4000");
//   // var socket = io();
//   // var socket = new io.Socket();
//   // socket.connect();
//   $('form').submit(function(){
//     socket.emit('chat message', $('#m').val());
//     socket.emit("retrieveSocketIds")
//     $('#m').val('');
//     return false;
//   });
//   socket.on('chat message', function(msg){
//     var id = socket.io.engine.id;
//     console.log(id)
//     $('#messages').append($('<li>').text(msg));
//     window.scrollTo(0, document.body.scrollHeight);
//   });
//   socket.on('retrieveSocketIds', function(socketIds){
//     console.log(socketIds)
//   });

// });
// </script>