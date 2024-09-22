import MessageContainer from "../components/MessageContainer";
import MicOn from "../icons/MicOn";
import Send from "../icons/Send";
import Square from "../icons/Square";
import {useContext, useEffect, useRef, useState} from "react";
import {ChatContext} from "../components/ChatContext";


function Chat() {
    const chatContext = useContext(ChatContext);

    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const scrollContainer = useRef<HTMLDivElement | null>(null);
    const [nextIsVoice, setNextIsVoice] = useState(false)
    const {
        messages, input, setInput, sendMessage, status
        , setDisplayLabel, voiceInputActive,
        cancelRecording, sendRecording, startChat, clearChatHistory,
        sendVoiceMessage
    } = chatContext;

    // timers for voice recording
    const startTimer = () => {
        const t = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        setTimer(t);
    };

    const stopTimer = () => {
        if (timer) clearInterval(timer);
        setTimeElapsed(0);
    };

    useEffect(() => {
        startChat()
        return clearChatHistory
    }, []);
    useEffect(() => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight
        }
    }, [messages]);
    return (
        <div className={'w-full h-full relative pb-16 '}>
            <div className="pb-3 overflow-hidden h-full">
                <div className="px-6 flex flex-col h-full overflow-auto" ref={scrollContainer}>
                    {messages.map((msg, index) => (
                        <MessageContainer
                            displayLabel={setDisplayLabel(messages, index)}
                            key={index} buttons={msg.buttons} imageUrl={msg.imageUrl && msg.imageUrl}
                            content={msg.message} from={msg.from} type={msg.type} name={msg.name} about={msg.about}
                            audioUrl={msg.audioUrl}
                        />
                    ))}
                </div>
            </div>
            <div
                className={`flex items-center p-2  bg-gray-100 rounded-xl border-2 border-gray-400 justify-between  w-full absolute left-0 bottom-0`}>
                {!voiceInputActive ?
                    (<input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                                if (!nextIsVoice) {
                                    await sendMessage()
                                } else {
                                    await sendVoiceMessage();
                                    setNextIsVoice(false)
                                }
                            }
                        }}
                        className="w-full bg-transparent focus:outline-none focus:ring-0 "
                        placeholder="Type a message..."
                    />) : (<div>
                        <div className={"w-full text-gray-600 font-bold"}>
                            {`${Math.floor(timeElapsed / 60)} : ${(timeElapsed % 60) < 10 ? `0${timeElapsed % 60}` : `${timeElapsed % 60}`}`}
                        </div>
                    </div>)
                }
                <div onClick={() => {
                    voiceInputActive ? stopTimer() : startTimer()
                    cancelRecording()
                }}
                     className={`p-2 hover:cursor-pointer transition-all rounded-full ${voiceInputActive && "bg-accent-900 hover:scale-105"} ${status === 'recording' && "animate-pulse "}`}>
                    {voiceInputActive ? <Square width={20} height={20} stroke={'white'} fill={'transparent'}/> :
                        <MicOn height={25} width={25} fill={`${voiceInputActive && "#fff"}`}/>
                    }
                </div>
                {voiceInputActive &&
                    <div onClick={() => {
                        sendRecording()
                        stopTimer()
                        setNextIsVoice(true)
                    }}
                         className={`p-2 hover:cursor-pointer transition-all rounded-full bg-accent-900 hover:scale-105`}>
                        <Send height={25} width={25} fill={`${voiceInputActive && "#fff"}`}/>
                    </div>
                }
            </div>

        </div>
    )
}

export default Chat