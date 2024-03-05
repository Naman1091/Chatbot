import React, { useState, useEffect , useRef } from 'react'
import {FaUserCircle, FaRobot} from 'react-icons/fa'
import { PiArrowClockwiseBold } from "react-icons/pi";
import moment from 'moment';


export default function Chatbot() {
  
  
  const messagesEndRef=useRef(null);
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
        const url = 'http://localhost:4443/text';
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userMsg })
        };
        const response = await fetch(url, options);
        const data = await response.json();

    } catch (error) {
        console.error(error);
    }
};

const delData = async () => {
  const url = 'http://localhost:4443/text'
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
          const url = 'http://localhost:4443/text';
          const options = {
              method: "GET"
          };
          const response = await fetch(url, options);
          const data = await response.json();
          setConversation(data.conversation)
      } catch (error) {
          console.error(error.message);
      }
  };
  fetchData()
}, [conversation]);

  //function to sccroll down
  const scrollBottom=()=>{
    messagesEndRef.current?.scrollIntoView({behavior:'smooth'});
  };
  //scroll to bottom of chat window when message come
  useEffect(()=>{
    scrollBottom();
    
  },[conversation]);

  const getCurrentTime = () => {
    return moment().format('LT');
  };
  const currentTime = getCurrentTime()
  

  //on enter send messages 
  const enterPress = (e) =>{
    if(e.key === 'Enter'){
      e.preventDefault();
      handleSubmit();
    }
  }
  

  return (
    <div className='d-flex align-items-center justify-content-center border border-2 border-success'>
      <div className='d-flex align-items-center justify-content-center border border-2' >
        <div className='d-flex flex-column justify-content-between' style={{ height: "70vh", width: "450px" }}>
          <div className='d-flex  align-items-start justify-content-start border border-success border-2 ' style={{ backgroundColor: 'orange' }} >
            <img src="./assests/bot1.png" alt="Bot Icon" className='d-flex flex-row  justify-content-center mx-4 rounded-pill  ' width='40' />
            <span className='d-flex align-self-center  justify-content-center ' style={{ 'text-transform': 'uppercase', 'text-shadow': '2px 2px 5px red', 'padding-left': '70px' }} >Message-Chat-Bot</span>
          </div>
          <div className='d-flex flex-column border p-3 text-black w-100 flex-fill' style={{ overflowY: 'auto',backgroundColor:'lightgreen'}}>
            {conversation.map((msg, index) => (
              <div key={index} className={`message d-flex ${msg.role==='user' ? "user justify-content-end":"bot"}`}>
                <div className='d-flex message-icon mr-1 my-2' style={{height:'40', alignItems:'center'}} >
                  {msg.role==='user' ? <FaUserCircle size={25}/>:<FaRobot size={25}/>}
                </div>
                 <div className={` d-flex message-content border border-black text-white rounded  my-1 p-2`} style={{backgroundColor:'blue'}}>{msg.text}</div>
                <div className='me-auto align-self-end' style={{ fontSize: '9px' }}>{ currentTime}</div>
              </div>
            ))
          }
          <div ref={messagesEndRef}/>
          </div>
          <div className='d-flex '>
            <input  placeholder='Type your message here...'  onKeyUp={enterPress} className='w-75 ' type="text"  value={userMsg} onChange={e => setUserMsg(e.target.value)}  />
            <button className='p-1' style={{backgroundColor:'white'}} type="submit" onClick={handleDelete}><PiArrowClockwiseBold size={30}/></button>
            <button  className='btn  w-25' style={{backgroundColor:'green',color:'white'}} type="submit" onClick={handleSubmit}>Send</button>
          </div>
        </div>
      </div>
    </div>

);
};
