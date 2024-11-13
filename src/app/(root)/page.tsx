'use client'

import { useState, useEffect, useRef } from 'react'
// import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronRight, Moon, Send, Sun, Trash2, X, HelpCircle } from 'lucide-react'
import { getAnswerAndEmotion } from '@/app/api/route'
import Image from 'next/image'


type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

// type AvatarMetadata = {
//   imageUrl: string;
//   mood: 'neutral' | 'happy' | 'thinking';
// };

// const avatarImages: AvatarMetadata[] = [
//   { 
//     imageUrl: "public\1. Happiness.png"
//     mood: 'happiness'
//   },
//   { 
//     imageUrl: "public\2. Sadness.png"
//     mood: "sadness"
//   },
//   { 
//     imageUrl: "",
//     mood: 'thinking'
//   }
// ];

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // New state for authentication
  const [password, setPassword] = useState('') // State to store password input

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedModel, setSelectedModel] = useState('assistants')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
   const [isExpanded, setIsExpanded] = useState(false);
   
   const [emotionUrl, setEmotionUrl] = useState('');
   

  // const handleTriggerClick = () => {
  //   setIsExpanded(true);
  // };
  // const [currentAvatar, setCurrentAvatar] = useState<AvatarMetadata>(avatarImages[0])
  // const [isAnimating, setIsAnimating] = useState(false)
  // const avatarRef = useRef<HTMLImageElement>(null)
  // Emotion image urls
  const EmotionImages = {
    Happiness: '/images/Happiness.png',
    Sadness: '/images/Sadness.png',
    Confusion: '/images/Confusion.png',
    Confidence: '/images/Confidence.png',
    Curiosity: '/images/Curiosity.png',
    Suprise: '/images/Suprise.png',
    Supportiveness: '/images/Supportiveness.png',
    Calmness: '/images/CalmnessNeutral.png',
    Default: '/images/CalmnessNeutral.png',
  }
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  // useEffect(() => {
  //   if (isAnimating && avatarRef.current) {
  //     avatarRef.current.addEventListener('animationend', () => setIsAnimating(false), { once: true })
  //   }
  // }, [isAnimating])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

// handleSendMessage Function with Updated JSON Object
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Create user message and add to messages list
      const newMessage: Message = { id: Date.now(), text: message, sender: 'user' };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setIsTyping(true);
      // Create the JSON object using the incoming message and other necessary details
      const apiJson = {
        question: message,
        message_id: 12345,
        user_id: 1234,
        platform: 'streamlit',
        model: 'assistants',
        media: 'text'
      };
    

      // const url = 'http://dr-hiro-service-test-1505102764.us-east-1.elb.amazonaws.com:80/test';
      // Changed url to use path defined in next.config.mjs. Port 80 is default
      const url = '/api/test/'
      try {
        // Fetch the answer from the API using the dynamically created JSON object
        const botReplyText = (await getAnswerAndEmotion(url, apiJson));
        console.log("Emotion", botReplyText)
       if (botReplyText?.emotion === 'happiness') {
        setEmotionUrl(EmotionImages.Happiness)
       } else if (botReplyText?.emotion === 'sadness') {
        setEmotionUrl(EmotionImages.Sadness)
       
       } else if (botReplyText?.emotion === 'confidence') {
        setEmotionUrl(EmotionImages.Confidence)
       
       } else if (botReplyText?.emotion === 'confusion') {
        setEmotionUrl(EmotionImages.Confusion)
       
       } else if (botReplyText?.emotion === 'suprise') {
        setEmotionUrl(EmotionImages.Suprise)
       }
        else if (botReplyText?.emotion === 'supportiveness') {
          setEmotionUrl(EmotionImages.Supportiveness)
       }
        else if (botReplyText?.emotion === 'curiosity') {
           setEmotionUrl(EmotionImages.Supportiveness)
       }
       else {
        setEmotionUrl(EmotionImages.Calmness)
       }

        // Check if botReplyText is not null and add bot message
        let botReply: Message;
        if ('error' in botReplyText) {
          // If there's an error, show the error message
          botReply = {
            id: Date.now(),
            text: botReplyText.error,
            sender: 'bot',
          };
        } else {
          // If no error, show the answer
          botReply = {
            id: Date.now(),
            text: botReplyText.answer,
            sender: 'bot',
          };
        }
        setMessages(prev => [...prev, botReply]);

        // Change avatar image based on botreply
        // const newIndex = (avatarImages.findIndex(avatar => avatar.imageUrl === currentAvatar.imageUrl) + 1) % avatarImages.length
        // setCurrentAvatar(avatarImages[newIndex])
        // setIsAnimating(true)
      } catch (error) {
        console.error('Error fetching bot response:', error)
      } finally {
        setIsTyping(false)
      }
    }
  }

  const moodStyles = {
    neutral: 'border-gray-400',
    happy: 'border-green-400',
    thinking: 'border-blue-400',
  }

 

    // Function to handle password submission
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault()
      // Replace 'yourpassword' with the actual password you want to use
      if (password === 'devcon2024') {
        setIsAuthenticated(true)
      } else {
        alert("Incorrect password. Please try again.")
      }
    }

  // Render the login screen if the user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="login-screen">
      <div className="h-screen inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-gray-800 light:bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-4 text-gray-100 light:text-gray-800">Please Enter Password</h1>

        {/* <h1>Please Enter Password</h1> */}
        <form onSubmit={handleLogin}>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <Button type="submit">Login</Button>
        </form>
        </div>
        </div>
        </div>
    )
  }

  // // const Login = () => {
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const [password, setPassword] = useState('');
  //   const [error, setError] = useState('');
  
  //   // Replace this with your desired password
  //   const correctPassword = 'yourPassword123';
  
  //   const handlePasswordSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (password === correctPassword) {
  //       setIsAuthenticated(true);
  //     } else {
  //       setError('Incorrect password. Please try again.');
  //     }
  //   };

  return (
    // <div className="login">
    // {/* Password Auth Overlay */}
    // {!isAuthenticated && (
    //   <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
    //     <form onSubmit={handlePasswordSubmit} className="bg-white p-6 rounded-lg shadow-md text-center">
    //       <h2 className="mb-4 text-lg font-semibold">Enter Password</h2>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="border p-2 rounded mb-2 w-full"
    //         placeholder="Password"
    //         required
    //       />
    //       {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    //       <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full">
    //         Submit
    //       </button>
    //     </form>
    //   </div>
    // )}
    // </div>

    // {/* Main Content (visible only if authenticated) */}
    // {isAuthenticated && (

    <div className={`flex h-screen w-full overflow-hidden ${!isDarkMode ? 'bg-[#121212] text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <style jsx global>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-3px); }
          75% { transform: translateY(3px); }
        }
        .typing-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin: 0 2px;
          background-color: currentColor;
          animation: wave 1.3s linear infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: -1.1s; }
        .typing-dot:nth-child(3) { animation-delay: -0.9s; }
        @keyframes avatarChange {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .avatar-change {
          animation: avatarChange 0.5s ease-out;
        }
      `}</style>
      <div className={`${isSidebarOpen ? 'w-64 sm:w-72 md:w-80' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden flex flex-col h-full ${!isDarkMode ? 'bg-[#163259] ' : 'bg-white '}`}>
        <div className="flex justify-between items-center p-4 ">
          <div className='flex justify-center items-center gap-4'>
          <Image 
           src='/images/DrHiro_Chat_Thumbnail.png'
           alt="Sidebar Image" 
           width={50} 
           height={50} 
          
           className={` rounded-[50%]`} 
          />
          <h2 className="font-bold text-lg">DR HIRO</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-gray-700 hover:text-gray-100">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            <div className="mb-4 sm:mb-6">
              <h2 className="font-bold mb-2 text-base sm:text-lg">About DR HIRO</h2>
              <p className="text-xs sm:text-sm opacity-80">DR HIRO is your expert cryptocurrency assistant, providing up-to-date information on prices, trends, and news.</p>
            </div>
            <div className="mb-4 sm:mb-6">
              <label htmlFor="model-select" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">Choose a model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger id="model-select" className={`w-full text-xs sm:text-sm ${!isDarkMode ? 'bg-[#163259]  border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt">GPT</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                  <SelectItem value="Ilama">Ilama</SelectItem>
                  <SelectItem value="assistants">assistants</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
           
          </div>
          <div className="h-[100%]">
           
         <div 
                className={`w-full h-[100%] flex justify-center items-center rounded-[20px] border-2 border-[#46deda] bg-gray-300 ${!isDarkMode ? 'bg-[#0a182a]' : 'bg-gray-300'}`}
              >
               <Image 
        src={ emotionUrl !== '' ? emotionUrl : EmotionImages.Default}
        alt="Emotion Image" 
        width={250} 
        height={1000} 
       
        className={`transition duration-300`} 
      />
        
              
            </div>
 
    


          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <header className={`flex flex-wrap justify-between items-center p-2 sm:p-4 ${!isDarkMode ? ' bg-[#0a182a]' : ' bg-white'}`}>
          <div className="flex items-center mb-2 md:mb-0">
            {!isSidebarOpen && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 hover:bg-gray-700 hover:text-gray-100">
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
            </div>
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-base sm:text-lg md:text-xl font-bold">
            DR HIRO - Your Cryptocurrency Chatbot
            </h1>
          <Button variant="outline" size="icon" onClick={toggleDarkMode} className={!isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}>
            {!isDarkMode ? <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> : <Moon className="h-3 w-3 sm:h-4 sm:w-4" />}
          </Button>
        </header>



         {/* <main className={`flex-1 overflow-auto p-2 sm:p-4 ${!isDarkMode ? 'bg-[#121212]' : 'bg-gray-50'}`}>
          {messages.map((msg) => (
            <div key={msg.id} className={`mb-2 sm:mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                msg.sender === 'user' 
                  ? !isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-900' 
                  : !isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
              } shadow-md`}>
                {msg.text}
              </div>
               {msg.sender === 'user' && (
        <div className="flex items-center">
        <Image 
        src="/images/DrHiro_Chat_Thumbnail.png" 
        alt="Bot Icon" 
        width={36} 
        height={36} 
        // className="mr-2"  
        className={`${msg.sender === 'user' ? 'ml-2' : 'mr-2'}`} 
      />

      </div>
      )}
      </div> 
      ))}

          {isTyping && (
            <div className="text-left">
              <div className={`inline-block p-2 sm:p-3 rounded-lg ${!isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} shadow-md`}>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
        </main> */}


<main className={`flex-1 overflow-auto p-2 sm:p-4 ${!isDarkMode ? 'bg-[#0a182a]' : 'bg-gray-50'}`}>
  {messages.map((msg) => (
    <div 
      key={msg.id} 
      className={`mb-2 sm:mb-4 flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {msg.sender === 'user' && (
        <div className={`flex items-start ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
          <Image 
            src="/images/user-icon.jpg" 
            alt="User Icon" 
            width={30} 
            height={30} 
            className="ml-2 rounded-full mt-[80px]" 
          />
          <div className={`flex justify-center items-center w-[45%] p-2 pr-5 sm:p-3 rounded-tr-20 rounded-tl-20 rounded-bl-20 rounded-br-5 text-xs sm:text-sm ${
            !isDarkMode ? 'bg-[#daf8f8] text-black' : 'bg-blue-100 text-black'
          } shadow-md`}>
            <p> {msg.text}</p>
           
          </div>
        </div>
      )}
         {/* Trash Button */}        
         <Button variant="default"  onClick={() => setMessages([])} className={`fixed transition duration-300 bottom-[250px] ${isSidebarOpen ? 'left-[56%]' : 'left-[50%]'} ${!isDarkMode ? 'text-white bg-[#163259]': 'bg-transparent text-black'} text-sm border border-[#709edc]  px-2 py-3 rounded-xl shadow-lg`} aria-label="Clear chat">
         Clear Chat
              </Button>
      {msg.sender === 'bot' && (
        <div className="flex items-start">
          <Image 
            src="/images/DrHiro_Chat_Thumbnail.png" 
            alt="Bot Icon" 
            width={38} 
            height={38} 
            // className={`${msg.sender === 'bot' ? 'ml-2' : 'mr-6'}`} 
            className="mr-2 rounded-full mt-[80px]" 
          />

          <div className={`flex justify-center items-centerinline-block w-[45%] rounded-tr-20 rounded-tl-20 rounded-bl-5 rounded-br-20  p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
            !isDarkMode ? 'bg-[#dbe7f6] text-gray-900' : 'bg-white text-black'
          } shadow-md`}>
            <p> {msg.text}</p>
          </div>
        </div>
      )}
    </div>
  ))}
  {isTyping && (
            <div className="text-left">
              <div className={`inline-block p-2 sm:p-3 rounded-lg ${!isDarkMode ? 'bg-[#0a182a] text-gray-200' : 'bg-white text-gray-900'} shadow-md`}>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
</main>

        
        <footer className={`p-2 sm:p-4  flex justify-center w-full gap-[50px] ${!isDarkMode ? 'border-gray-700 bg-[#0a182a]' : 'border-gray-200 bg-white'}`}>
          <form onSubmit={handleSendMessage} className="flex w-[90%]">
            <Input
              type="text"
              placeholder="What would you like to know about cryptocurrencies?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`flex-1 px-2 py-10 rounded-[20px] outline-none text-xs sm:text-sm ${!isDarkMode ? 'bg-[#163259] border-[#163259] text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
            />
            <Button type="submit" className={`z-2 p-2 ml-[-65px] mt-[20px] flex justify-center item-center  rounded-[50%] text-xs sm:text-sm ${isDarkMode ? 'bg-[#dbe7f6] hover:bg-[#dbe7f6]' : 'bg-[#0a182a] hover:bg-[#0a182a]'}`}>
              <Send className="rotate-[45deg]" />
            </Button>
          </form>
          {/* Help Button */}
         {isExpanded ? <Button 
          
            //variant="primary" 
            size="icon" 
            onClick={()=> setIsExpanded(false)} // Replace with actual help function
            className=" mt-[20px] text-lg border-gray-100 bg-[#dbe7f6]  p-0 rounded-full shadow-lg" 
            aria-label="Help">
        <HelpCircle className="text-xl" /></Button>  :
          <Button 
          
            //variant="primary" 
            size="icon" 
            onClick={()=> setIsExpanded(true)} // Replace with actual help function
            className=" mt-[20px] text-lg border-gray-100 bg-[#2c2c2c] hover:bg-gray-700 p-0 rounded-full shadow-lg" 
            aria-label="Help">
        <HelpCircle className="text-xl" /></Button> }
        </footer>
      </div>
    </div>
    
  )
// )}
}
