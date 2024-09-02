import TreeIcon from "../icons/Tree";
import ArrowRight from "../icons/ArrowRight";
import {useNavigate} from "react-router-dom";

function IntentHeaders({icon, text}: { icon: any, text: string }) {
    const navigate = useNavigate();
    return <div
        className={'bg-white rounded-md py-1 hover:cursor-pointer hover:bg-neutral-50 px-6 border-2 border-gray-200 flex w-full items-center flex-row'}
        onClick={()=>navigate('/chat')}
    >
        {icon}
        <span className={'whitespace-nowrap ml-3'}>{text}</span>
        <div className={'flex justify-end w-full'}>
            <ArrowRight width={26} height={26} fill={'black'}/>
        </div>
    </div>
}

export default IntentHeaders;