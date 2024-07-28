import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import sendBtn from './assets/send.svg';
import userIcon from './assets/5143537.jpg';
import gptImgLogo from './assets/chatgptLogo.svg';
import { useContext, useEffect, useRef } from 'react';
import { Context } from './context/Context';

function App() {
  const { onSent, messages, loading, setInput, input } = useContext(Context);
  const chatEndRef = useRef(null);

  const handleSend = () => {
    onSent();
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewChat = () => {
    window.location.reload();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <div className="App">
      <div className='sidebar'>
        <div className='upperSide'>
          <div className='upperSideTop'>
            <img src={gptLogo} alt='Logo' className='logo' /> <span className='brand'>Sudo Bot</span>
          </div>
          <button onClick={handleNewChat} className='midBtn'><img src={addBtn} alt='New Chat' className='addBtn'/>New Chat</button>
          <div className='upperSideBottom'></div>
        </div>
        {/* <div className='lowerSide'>
          <div className='listItems'>
            <img className='listItemsImg' src={home} alt='Home' /> Home
          </div>
          <div className='listItems'>
            <img className='listItemsImg' src={saved} alt='Saved' /> Saved
          </div>
          <div className='listItems'>
            <img className='listItemsImg' src={rocket} alt='Upgrade to Pro' /> Upgrade to Pro
          </div>
        </div> */}
      </div>
      <div className='main'>
        <div className='chats'>
        {messages.length === 0 && !loading && (
          <div className='welcome'>
            <h2>Welcome to Sudo Bot!</h2>
            <p>Ask me anything or start a new chat to get started.</p>
            <div className='instructions'>
              <p>SudoBot uses Google's Gemini AI model to generate responses. It's designed to be helpful and accurate, but it's not perfect.</p>
              <p>Click <span>New Chat</span> button on the sidebar to chat from beginning</p>
            </div>
          </div>
        )}
          {messages.map((message, index) => (
            <div key={index} className={`chat ${message.sender === 'bot' ? 'bot' : ''}`}>
              <img className='chatimg' src={message.sender === 'bot' ? gptImgLogo : userIcon} alt={message.sender} />
              <p className='txt'>{message.text}</p>
            </div>
          ))}
          {loading && (
            <div className='chat bot'>
              <img className='chatimg' src={gptImgLogo} alt="Bot" />
              <p className='txt'>Loading...</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className='chatFooter'>
          <div className='inp'>
            <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Type a message...' />
            <button onClick={handleSend} className='send'>
              <img src={sendBtn} alt='send' />
            </button>
          </div>
          <p>SudoBot may produce inaccurate information sometimes. This is a Hobby project.</p>
        </div>
      </div>
    </div>
  );
}

export default App;