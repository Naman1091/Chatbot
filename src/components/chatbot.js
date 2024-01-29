import React from 'react'
import ChatBot from 'react-simple-chatbot';
import {ThemeProvider} from 'styled-components';

const query =[
    {
      id:'0',
      message:'Hey User!',
      trigger:'1',
    },
    {
      id:'1',
      message:'Please write your name',
      trigger:'2'
    },
    {
      id:'2',
      user:true,
      trigger:'3',
    },
    {
      id:'3',
      message:'hi {previousValue},have a GOOD DAY, How can I help you? choose option',
      trigger:'4',
    },
    {
      id:'4',
      options:[{value:'MS in abroad ',label:'MS in abroad',trigger:'abroad'},
      {value:'MS in india',label:'MS in India',trigger:'india'},
      {value:'Contact us',label:'Contact us',trigger:'contact'},
    ],
    },
    {
      id:'abroad',
      message:"Ms From germany is a good option due to its cheap education",
      trigger:'4',
    },
    {
      id:'india',
      message:"Ms From IIIt hyderabad is a good option due to its quality education",
      trigger:'4',
    },
    {
      id:'contact',
      message:"Please provide phone No.",
      trigger:'phone'
    },
    {
      id:'phone',
      message:"Enter your phone number",
      trigger:'5'
    },
    {
      id:'5',
      user:true,
      trigger:'6',
    },
    {
      id:'6',
      message:"Our customer care executive contact you shorlty",
      end:true,
    }
  ]
  
  const theme={
      background: 'palegreen',
      headerBgColor: 'Aqua',
      headerFontSize: '25px',
      botBubbleColor: 'blue',
      headerFontColor: 'Black',
      botFontColor: 'white',
      userBubbleColor: 'Red',
      userFontColor: 'white',
  };

 export default function Chatbot() {
  return (
    
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot headerTitle="React Bot"
                 steps={query}
                 floating='true'
                 
                 />
       </ThemeProvider> 
    </div>
  )
}

