import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import io from "socket.io-client";

function App() {
    const [socket, setSocket] = useState()
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    useEffect(() => {
        
        // const s = io.connect(
        //     process.env.REACT_APP_RASA_SOCKETIO_ENDPOINT
        // )
        
        // setSocket(s)
    }, []);
    
    const sendMessage = async () => {
        const r = await fetch('http://localhost:5005/webhooks/rest/webhook', {
           method:'POST',
            body: JSON.stringify({
                sender:'test_user', 
                message:input
            })
        })
        const data = await r.json();
        data.forEach(element => {
            setMessages([...messages, element.text]);
        })
        
    }
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 p-6 overflow-y-auto">
                <ul className="space-y-4">
                    {messages.map((msg, index) => (
                        <li key={index} className="bg-white p-3 rounded-lg shadow-sm max-w-md">
                            {msg}
                        </li>
                    ))}
                </ul>
            </div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={sendMessage}
                >
                    Send
                </button>
        </div>
    );
}

export default App;
