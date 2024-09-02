import AvatarManIcon from "../icons/AvatarMan";
import RobotIcon from "../icons/Robot";

type MessageContainerType = {
    content: string;
    from: "user" | "bot"
    displayLabel: boolean,
    imageUrl?: string,
    buttons?: string[]
}

function MessageContainer({from, content, displayLabel, imageUrl, buttons}: MessageContainerType) {
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
             className={`${from === "bot" ? "bg-neutral-200" : "bg-accent-100"} rounded-md p-3 flex flex-col`}>
            
            <div id={'contentHolder'} className={'flex flex-wrap'}>
                {imageUrl &&
                    <img src={imageUrl} className={'rounded-md m-2'} alt={"message image"}/>
                }
                <div className={''}>{content}</div>
            </div>
            <div id={'buttonholder'} className={'flex flex-wrap mt-5 mb-2'}>
                {buttons && buttons.map(button => (
                    <div className={'bg-accent-100 text-accent-900 border-2 border-accent-900 rounded-full px-3 py-1 mx-2 hover:border-[3px] hover:cursor-pointer'}>{button}</div> 
                ))}
            </div>

        </div>
    </div>
}

export default MessageContainer;