import React, { useState, useEffect , useRef } from 'react'
import {FaUserCircle, FaRobot} from 'react-icons/fa'
import axios from 'axios';

export default function Chatbot() {
  const [messages,setMessages]=useState([]);
  const [inputValue,setInputValue]=useState('');
  const messagesEndRef=useRef(null);
  const [name, setName] = useState('');

  //function to sccroll down
  const scrollBottom=()=>{
    messagesEndRef.current?.scrollIntoView({behavior:'smooth'});
  };
  //scroll to bottom of chat window when message come
  useEffect(()=>{
    scrollBottom();
  },[messages]);

  const handleClick=(e) =>{
    setInputValue(e.target.value);
  };

  //function to handle sending messages
  const sendMessage= () =>{
    if(inputValue.trim()==='') return;

    setMessages(messages => [...messages,{text:inputValue,isUser:true,time:new Date()}]);
    setInputValue('');

    setTimeout(() => {
      if(messages.length === 0){
        const bot1="Hi , whats your name?";
        setMessages(messages => [...messages,{text:bot1, isUser:false,time:new Date()}]);
      }
      else if(messages.length === 2){
        const bot2=`Hi ${name},How can i help you ?`;
        setMessages( messages => [...messages,{text:bot2, isUser:false,time:new Date()}]);
      }
      else if(messages.length === 4){
        const bot3="thank you our executive will contact you ";
        setMessages(messages => [...messages,{text:bot3,isUser:false,time:new Date()}]);
      }
    },1000);
  };

  //on enter send messages 
  const enterPress = (e) =>{
    if(e.key === 'Enter'){
      e.preventDefault();
      sendMessage();
    }
  }
  //save user name
  const saveName = () =>{
    setName(inputValue.trim());
    sendMessage();
  }

  return (
    <div className='d-flex align-items-center justify-content-center border border-2 border-success'>
      <div className='d-flex align-items-center justify-content-center border border-2' >
        <div className='d-flex flex-column justify-content-between' style={{ height: "75vh", width: "350px" }}>
          <div className='d-flex  align-items-start justify-content-start border border-success border-2 ' style={{ backgroundColor: 'orange' }} >
            <img src="./assests/bot1.png" alt="Bot Icon" className='d-flex flex-row  justify-content-center mx-4 rounded-pill  ' width='40' />
            <span className='d-flex align-self-center  justify-content-center ' style={{ 'text-transform': 'uppercase', 'text-shadow': '2px 2px 5px red', 'padding-left': '20px' }} >Message-Chat-Bot</span>
          </div>
          <div className='d-flex flex-column border p-3 text-black w-100 flex-fill' style={{ overflowY: 'auto',backgroundColor:'lightgreen'}}>
            {messages.map((msg, index) => (
              <div key={index} className={'message d-flex ${msg.isUser ? "user justify-content-end":"bot"}'}>
                <div className='message-icon mr-2'>
                  {msg.isUser ? <FaUserCircle/>:<FaRobot/>}
                </div>
                <div className={` d-flex message-content border border-black text-white rounded my-2 p-2`} style={{backgroundColor:'blue'}}>{msg.text}</div>
              </div>
            ))
          }
          <div ref={messagesEndRef}/>
          </div>
          <div className='d-flex '>
            <input type="text" placeholder='Type your message here...' value={inputValue} onChange={handleClick} onKeyUp={enterPress} className='w-75 ' />
            <button type="button" className='btn  w-25' style={{backgroundColor:'green',color:'white'}} onClick={inputValue.trim() === ''? saveName:sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>

);
};


{/* <div className='message-time ml-2'>{msg.time.toLocaleTimeString()}</div> */}

import React, { useEffect, useState } from 'react'

function ChatBot() {
    const [userMsg, setUserMsg] = useState('');
    const [conversation, setConversation] = useState([]);

    const handleSubmit = () => {
        postData();
        setUserMsg('');
    };

    const handleDelete = () => {
        delData();
    };

    const postData = async () => {
        try {
            const url = 'http://localhost:4443/lexbot/text';
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userMsg })
            };
            const response = await fetch(url, options);
            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const delData = async () => {
        const url = 'http://localhost:4443/lexbot/text'
        const options = { method: "DELETE" };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'http://localhost:4443/lexbot/text';
                const options = {
                    method: "GET"
                };
                const response = await fetch(url, options);
                const data = await response.json();
                setConversation(data)
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData()
    }, [conversation]);

    return (
        <>
            <div> ChatBot </div>
            <input type="text" name="text" value={userMsg} onChange={e => setUserMsg(e.target.value)} />
            <button type="submit" onClick={handleSubmit}> send </button>
            <button type="submit" onClick={handleDelete}> delete </button>

            <div>
                {conversation.map((msg, index) => (
                    <p key={index}> {msg.role === 'user' ? "User: " : "Bot: "}{msg.text} </p>
                ))}
            </div>
        </>
    )
};

export default ChatBot;
