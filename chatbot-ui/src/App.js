import './App.css';
import {useEffect, useState} from "react";
import io from "socket.io-client";

function App() {
    const [socket, setSocket] = useState()
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const rasaUrl = document.querySelector("#Chatbot").getAttribute('data-rasa-rest-url');
    useEffect(() => {

        // const s = io.connect(
        //     process.env.REACT_APP_RASA_SOCKETIO_ENDPOINT
        // )

        // setSocket(s)
    }, []);

    const sendMessage = async () => {
        setMessages((prevMessages) => [...prevMessages, {
            from: 'user',
            message: input
        }]);
        const r = await fetch(rasaUrl, {
            method: 'POST',
            body: JSON.stringify({
                sender: 'test_user',
                message: input
            })
        })
        setInput("")
        
        const data = await r.json();
        data.forEach(element => {
            setMessages((prevMessages) => [...prevMessages, {
                from: 'bot',
                message: element.text
            }]);
        })

    }
    return (
        <div className="flex flex-col h-full w-full bg-gray-100">
            <div className="p-6 overflow-auto h-full">
                <ul className="space-y-4 flex flex-col">
                    {messages.map((msg, index) => (
                        <li key={index} className={msg.from == "bot"? "self-start bg-white p-3 rounded-lg shadow-sm max-w-md": "self-end bg-sky-900 text-white p-3 rounded-lg shadow-sm max-w-md"}>
                            {msg.message}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={'flex max-h-10'}>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
    );
}

export default App;

