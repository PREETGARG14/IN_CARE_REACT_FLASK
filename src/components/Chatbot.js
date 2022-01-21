import React from 'react';
import '../Chatbot.css';
import '../bootstrap.min.css';
export default function Chatbot() {


  return (
    <>
      <div id="container" class="container">
        <div id="chat" class="chat">
          <div id="messages" class="messages"></div>
          <input id="input" class='inputA' type="text" placeholder="Say something..." autocomplete="off" autofocus="true" />
        </div>
        <img src="bot.png" alt="Robot cartoon" height="500vh" />
      </div>

    </>
  )
}
