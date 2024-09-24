import RobotIcon from "../icons/Robot";
import ExpandIcon from "../icons/Expand";
import CloseIcon from "../icons/Close";
import {useLocation, useNavigate} from "react-router-dom";
import ArrowRight from "../icons/ArrowRight";
import MinimizeIcon from "../icons/Minimize";
import {useContext} from "react";
import {ChatContext} from "./ChatContext";

type HeaderProps = {
    expanded: boolean,
    setExpanded: () => void,
    close: () => void,
}

function Header(
    {
        expanded,
        setExpanded,
        close
    }: HeaderProps,
) {

    const chatContext = useContext(ChatContext)
    const location = useLocation();
    const navigate = useNavigate();
    const {intent} = chatContext


    return <div id={'header'} className={'min-h-16 h-16 bg-accent-900 flex justify-between items-center px-5'}>
        {location.pathname === '/' && <div className={'flex items-center justify-center'}>
            <RobotIcon width={30} height={30} fill={'white'}/>
            <div className={'px-3 text-white'}>
                <div>My name is Svardaga</div>
                <div>I am your personal AI-assitant</div>
            </div>
        </div>}
        {location.pathname === '/chat' &&
            <div className={'flex flex-col items-center justify-center hover:cursor-pointer'}
                 onClick={() => {
                     navigate(-1)
                 }}>
                <ArrowRight width={30} height={30} fill={'white'} className={'rotate-180 '}
                />
                <div className={'px-3 text-white text-sm font-bold -m-2'}>
                    <div>Back</div>
                </div>
            </div>}
        <div className={'text-white text-lg font-bold'}>
            {location.pathname === "/chat" && intent === "apply_chat" && <div>Apply services</div>}
            {location.pathname === "/chat" && intent === "general_chat" && <div>General</div>}
            {location.pathname === "/chat" && intent === "elderly_care_services" && <div>Elderly care services</div>}
        </div>
        {/*{location.pathname === "/chat" && intent === "apply_chat" && <div>Apply services</div>}*/}
        <div className={'flex'}>
            {expanded ? <MinimizeIcon width={26} height={26} fill={'white'} className={"mx-2 hover:cursor-pointer"}
                                      onClick={setExpanded}/> :
                <ExpandIcon width={26} height={26} fill={'white'} className={'mx-2 hover:cursor-pointer'}
                            onClick={setExpanded}/>
            }
            <CloseIcon width={26} height={26} fill={'white'} className={'mx-2 hover:cursor-pointer'} onClick={close}/>
        </div>
    </div>
}

export default Header;