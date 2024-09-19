import {useEffect, useState} from "react";
import MessageContainer from "../components/MessageContainer";
import MicOn from "../icons/MicOn";
import {useReactMediaRecorder} from "react-media-recorder";
import {start} from "node:repl";
import Send from "../icons/Send";
import Square from "../icons/Square";

type Message = {
    from: 'bot' | "user";
    message: string
    buttons?: string[],
    imageUrl?: string

}

function Chat() {
    const [socket, setSocket] = useState()
    const [voiceInputActive, setVoiceInputActive] = useState(false)
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
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [timer, setTimer] = useState<NodeJS.Timeout>()
    const [audioBlob, setAudioBlob] = useState<Blob>()
    const [shouldSend, setShouldSend] = useState(false)
    const {status, startRecording, stopRecording, clearBlobUrl,} =
        useReactMediaRecorder({
            audio: true,
            onStop: async (blobUrl, blob) => {
                setAudioBlob(blob)
            },
        });
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
    const startTimer = () => {
        const t = setInterval(() => {
            setTimeElapsed(prev => prev + 1)
        }, 1000)
        setTimer(t)
    }
    const stopTimer = () => {
        if (timer) {
            clearInterval(timer)
        }
        setTimeElapsed(0)
    }
    const sendVoice = async () => {

        if (audioBlob) {
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.wav');
            const r = await fetch(
                "http://localhost:8000/speech2text",
                {
                    method: "POST",
                    body: formData
                }
            )
            const json = await r.json();
            setInput(json['transcription'])
            setVoiceInputActive(!voiceInputActive)
        }
    }
    useEffect(() => {
        if (shouldSend && status === "stopped") {
            sendVoice()
            setShouldSend(false)
        }
    }, [status])
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
            <div
                className={'flex items-center p-2 m-3 bg-gray-100 rounded-lg border-2 border-gray-400 justify-between'}>
                {!voiceInputActive ?
                    (<input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        className="w-full bg-transparent focus:outline-none focus:ring-0 "
                        placeholder="Type a message..."
                    />) : (<div>
                        <div className={"w-full text-gray-600 font-bold"}>
                            {`${Math.floor(timeElapsed / 60)} : ${(timeElapsed % 60) < 10 ? `0${timeElapsed % 60}` : `${timeElapsed % 60}`}`}
                        </div>
                    </div>)
                }
                <div onClick={() => {
                    setVoiceInputActive(!voiceInputActive)
                    voiceInputActive ? stopRecording() : startRecording()
                    voiceInputActive ? stopTimer() : startTimer()
                    clearBlobUrl()
                }}
                     className={`p-2 hover:cursor-pointer transition-all rounded-full ${voiceInputActive && "bg-accent-900 hover:scale-105"} ${status ==='recording' && "animate-pulse "}` }>
                    {voiceInputActive ? <Square width={20} height={20} stroke={'white'} fill={'transparent'}/> :
                        <MicOn height={25} width={25} fill={`${voiceInputActive && "#fff"}`}/>
                    }
                </div>
                {voiceInputActive &&
                    <div onClick={() => {
                        stopRecording()
                        stopTimer()
                        setShouldSend(true)
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