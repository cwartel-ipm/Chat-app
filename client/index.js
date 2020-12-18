import React from "react";
import ReactDOM from "react-dom";
import ChatApp from "./ChatApp";
import Sockette from "sockette";
import store from "./state/store";
import { onConnect, recievedMessage } from "./state/actions";
import { Provider } from "react-redux";
import "./style.css";
const ws = new Sockette("wss://9f6vp.sse.codesandbox.io/", {
  maxAttempts: 10,
  onopen: (e) => store.dispatch(onConnect(ws)),
  onmessage: (e) => store.dispatch(recievedMessage(e.data)),
  onreconnect: (e) => console.log("Reconnecting...", e),
  onmaximum: (e) => console.log("Stop Attempting!", e),
  onclose: (e) => console.log("Closed!", e),
  onerror: (e) => console.log("Error:", e)
});

//ws.send('Hello, world!');
//ws.json({type: 'ping'});
//ws.close(); // graceful shutdown

// Reconnect 10s later
//setTimeout(ws.reconnect, 10e3);

const ChatContainer = () => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      ></link>
      <h1>Chat App</h1>
      <div className="chat-container">
        <ChatApp user="sam" />
        <ChatApp user="jack" />
      </div>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <ChatContainer />
  </Provider>,
  document.getElementById("root")
);

/* //
	<script>
	var ws = new WebSocket(`wss://y2z9k7vvj.sse.codesandbox.io/`)
    ws.onerror = () => 'WebSocket error'
	ws.onmessage=(message)=> console.log("message",message) 
    ws.onopen = () => {
		ws.send(JSON.stringify({user:"Serdar", message:"Hello"}))
	}
	
    ws.onclose = () => 'WebSocket connection closed'

</script>
*/
