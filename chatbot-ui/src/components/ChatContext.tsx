import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {useReactMediaRecorder} from 'react-media-recorder';

interface Message {
    message: string;
    from: 'bot' | 'user';
    imageUrl?: string;
    buttons?: string[];
}

export interface ChatType {
    type: "elderly_care_services" | "general_chat"
}

interface ChatContextType {
    voiceInputActive: boolean;
    messages: Message[];
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setIntent: React.Dispatch<React.SetStateAction<ChatType['type']>>;
    sendMessage: () => Promise<void>;
    getGreeting: () => Promise<void>;
    setDisplayLabel: (msgs: Message[], index: number) => boolean;
    status: string;
    sendRecording: () => void;
    cancelRecording: () => void;
    startChat: () => Promise<void>;
    clearChatHistory: () => void
}

const defaultContext: ChatContextType = {
    cancelRecording: () => {
    },
    startChat: async () => {
    },
    sendRecording: () => {
    },
    voiceInputActive: false,
    messages: [],
    input: '',
    setInput: () => {
    },
    setIntent: () => {},
    sendMessage: async () => {
    },
    getGreeting: async () => {
    },
    setDisplayLabel: () => true,
    status: 'idle',
    clearChatHistory: () => {}
};
export const ChatContext = createContext<ChatContextType>(defaultContext);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [voiceInputActive, setVoiceInputActive] = useState(false);
    const [messages, setMessages] = useState<Message[]>([

    ]);
    const [input, setInput] = useState<string>("");
    const [audioBlob, setAudioBlob] = useState<Blob>();
    const [shouldSend, setShouldSend] = useState(false);
    const [intent, setIntent] = useState<ChatType['type']>("general_chat")
    const [sessionId, setSessionId] = useState<string>("")
    const {status, startRecording, stopRecording, clearBlobUrl} =
        useReactMediaRecorder({
            audio: true,
            onStop: async (blobUrl, blob) => {
                setAudioBlob(blob);
            },
        });

    const _getEndpoint: (type: "refresh" | "start" | "chat") => string = (type) => {

        let endpointType = ""
        const chatBackendBaseUrl = process.env.REACT_APP_CHAT_BASEURL;
        switch (intent) {
            case "elderly_care_services":
                endpointType = `${chatBackendBaseUrl}/elderly_care_chat`
                break;

            case "general_chat":
                endpointType = `${chatBackendBaseUrl}/general_chat`
                break;
            default:
                endpointType = `${chatBackendBaseUrl}/general_chat`
                break;
        }
        switch (type) {
            case "chat":
                return `${endpointType}/chat_text`
            case "refresh":
                return `${endpointType}/refresh`
            case "start":
                return `${endpointType}`
            default:
                return `${endpointType}`
        }
        return endpointType
    }
    const startChat = async () => {
        const endpoint = await _getEndpoint("start");
        const response = await fetch(endpoint)
        const j = await response.json()
        setSessionId(j['_uuid'])
    }
    
    const clearChatHistory = () => {
        setMessages([])
    }
    const getGreeting = async () => {
        const finalEndpoint = await _getEndpoint("chat");
        if (finalEndpoint) {
            const r = await fetch(`${finalEndpoint}`, {
                method: 'POST',
                body: JSON.stringify({
                    session_id: sessionId,
                    question: "Hi"
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const text: string = await r.json();
            setMessages((prevMessages) => [...prevMessages, {
                from: 'bot',
                message: text
            }]);
        }
    }
    const sendMessage = async () => {
        const finalEndpoint = await _getEndpoint("chat");
        if (finalEndpoint) {
            setMessages((prevMessages) => [...prevMessages, {
                from: 'user',
                message: input
            }]);
            setInput("");
            const r = await fetch(`${finalEndpoint}`, {
                method: 'POST',
                body: JSON.stringify({
                    session_id: sessionId,
                    question: input
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const text: string = await r.json();
            setMessages((prevMessages) => [...prevMessages, {
                from: 'bot',
                message: text
            }]);
        }
    };

    const setDisplayLabel = (msgs: Message[], index: number): boolean => {
        if (index === 0) return true;
        return messages[index - 1].from !== msgs[index].from; // If the last message is from the same person, return false. 
    };


    const cancelRecording = () => {
        setVoiceInputActive(!voiceInputActive)
        voiceInputActive ? stopRecording() : startRecording()
        clearBlobUrl()
    }
    const sendRecording = () => {
        stopRecording()
        setShouldSend(true)
    }
    // For sending recorded voice to backend
    const sendVoice = async () => {
        if (audioBlob) {
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.wav');
            const r = await fetch("http://localhost:8000/speech2text", {
                method: "POST",
                body: formData
            });
            const json = await r.json();
            setInput(json['transcription']);
            setVoiceInputActive(!voiceInputActive);
        }
    };

    useEffect(() => {
        if (shouldSend && status === "stopped") {
            sendVoice();
            setShouldSend(false);
        }
    }, [status]);

    return (
        <ChatContext.Provider
            value={{
                messages,
                input,
                setInput,
                sendMessage,
                status,
                setDisplayLabel,
                voiceInputActive,
                cancelRecording,
                sendRecording,
                startChat,
                setIntent,
                clearChatHistory,
                getGreeting
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
