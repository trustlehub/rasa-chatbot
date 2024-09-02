import {useState} from "react";
import MessageContainer from "../components/MessageContainer";

type Message = {
    from: 'bot' | "user";
    message: string
    buttons?: string[],
    imageUrl?: string

}

function Chat() {
    const [socket, setSocket] = useState()
    const [messages, setMessages] = useState<Message[]>([
        {
            message: "Testing message",
            from: 'bot',
            imageUrl: "https://picsum.photos/200",
            buttons: [
                "Test 1",
                "Test 2",
                "Test 3",
                "Test 4",
            ]
        },
        {
            message: "Testing message",
            from: 'bot'
        },
        {
            message: "Testing message",
            from: 'bot'
        },
        {
            message: "Testing message",
            from: 'bot',
            imageUrl: "https://picsum.photos/200/200",
            buttons: [
                "Test 1",
                "Test 2",
                "Test 3",
                "Test 4",
            ]
        },
        {
            message: "Testing message",
            from: 'user'
        },
        {
            message: "Testing message",
            from: 'user'
        },
        {
            message: "Testing message",
            from: 'user'
        },
        {
            message: "Testing message",
            from: 'user'
        },
        {
            message: "Testing message",
            from: 'user'
        },
        {
            message: "Testing message",
            from: 'bot'
        },
        {
            message: "Testing message",
            from: 'user'
        },
        {
            message: "Testing message",
            from: 'bot',
        },
        {
            message: "Testing message",
            from: 'user'
        },
    ]);
    const [input, setInput] = useState<string>("");
    const sendMessage = async () => {
        const rasaUrl = document.querySelector("#Chatbot")?.getAttribute('data-rasa-rest-url');
        if (rasaUrl) {
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

            const data: { text: string }[] = await r.json(); // TODO: add actual type
            data.forEach(({text}) => {
                setMessages((prevMessages) => [...prevMessages, {
                    from: 'bot',
                    message: text
                }]);
            })
        }

    }
    const setDisplayLabel = (msgs: Message[], index: number): boolean => {
        if (index === 0) {
            return true
        } else if (messages[index - 1].from !== msgs[index].from) {
            return true
        }
        return false
    }
    return (
        <div className={'w-full pb-16 overflow-auto h-full relative'}>
            <div className="px-6 pb-3 ">
                <div className="flex flex-col">
                    {messages.map((msg, index) => (
                        <MessageContainer
                            displayLabel={setDisplayLabel(messages, index)}
                            key={index} buttons={msg.buttons && msg.buttons} imageUrl={msg.imageUrl && msg.imageUrl}
                            content={msg.message} from={msg.from}/>
                    ))}
                </div>
            </div>
            <div className={'flex p-6 '}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="w-full  bg-gray-100 rounded-lg border-2 border-gray-400 p-3 focus:outline-none focus:ring-0 "
                    placeholder="Type a message..."
                />
            </div>

        </div>
    )
}

export default Chat