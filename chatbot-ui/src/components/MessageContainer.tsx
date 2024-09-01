import AvatarManIcon from "../icons/AvatarMan";
import RobotIcon from "../icons/Robot";

type MessageContainerType = {
    content: string;
    from: "user" | "bot"
    displayLabel: boolean
}

function MessageContainer({from, content, displayLabel}: MessageContainerType) {
    return <div className={"w-full"}>
        <div id={"user"} className={`flex ${displayLabel? 'mb-3':"mb-1"}`}>
            {displayLabel &&
                <div className={'mt-8 flex'}>
                {from === "bot" ? (<RobotIcon width={24} height={24}/>) : <AvatarManIcon width={24} height={24} />}
                <div className={'ml-3'}>{from === "bot" ? "Svardaga" : "You"}</div>
                </div>
            }
        </div>
        <div id={"content"} className={`${from === "bot" ? "bg-neutral-200":"bg-accent-100"} rounded-md p-3`}>
            {content}
        </div>
    </div>
}

export default MessageContainer;