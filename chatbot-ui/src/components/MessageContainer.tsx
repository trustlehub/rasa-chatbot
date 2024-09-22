import AvatarManIcon from "../icons/AvatarMan";
import RobotIcon from "../icons/Robot";
import {Link} from "react-router-dom";
import {Message} from "../types";

type MessageContainerType = {
    content: string | undefined;
    from: "user" | "bot"
    displayLabel: boolean
    imageUrl?: string
    buttons?: {
        name: string
        source: string
    }[]
    name?: string
    about?: string
    type: Message['type']
    audioUrl?: string
}

function MessageContainer({from, type, content, displayLabel, imageUrl, buttons, about, name, audioUrl}: MessageContainerType) {
    return <div className={"w-full"}>
        <div id={"user"} className={`flex ${displayLabel ? 'mb-3' : "mb-1"}`}>
            {displayLabel &&
                <div className={'mt-8 flex'}>
                    {from === "bot" ? (<RobotIcon width={24} height={24}/>) : <AvatarManIcon width={24} height={24}/>}
                    <div className={'ml-3'}>{from === "bot" ? "Svardaga" : "You"}</div>
                </div>
            }
        </div>
        <div id={"content"}
             className={`${from === "bot" ? type === 'sr' ? "border-2 border-neutral-100" : "bg-neutral-200" : "bg-accent-100"} rounded-md p-3 flex flex-col`}>

            <div id={'contentHolder'} className={'flex flex-wrap '}>
                {imageUrl &&
                    <img src={imageUrl} className={'mb-2 '} alt={"message image"}/>
                }
                <div className={''}>
                    <div className={'font-bold text-xl'}>{name}</div>
                    <div>{about}</div>
                    <div>{content}</div>
                </div>
                {audioUrl && <audio controls src={audioUrl}/>}

            </div>

            {buttons && (
                <div id={'buttonholder'} className={'flex flex-wrap mt-5 mb-2'}>
                    {buttons.map(button => (
                        <div
                            className={'bg-accent-100 text-accent-900 border-2 border-accent-900 rounded-full px-3 py-1 mx-2 hover:border-[3px] hover:cursor-pointer'}>{button.name}
                        </div>
                    ))}
                </div>
            )}

        </div>
    </div>
}

export default MessageContainer;