import {SVGProps} from "react";

function CloseIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="800"
            viewBox="0 0 32 32"
            {...props}
        >
            <path
                d="M16 0C7.164 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 30.032C8.28 30.032 2 23.72 2 16S8.28 2 16 2s14 6.28 14 14-6.28 14.032-14 14.032zm5.657-19.688a1 1 0 00-1.414 0l-4.242 4.242-4.242-4.242a1 1 0 10-1.415 1.414L14.586 16l-4.242 4.242a1 1 0 001.415 1.414l4.242-4.242 4.242 4.242a1 1 0 001.414-1.414L17.415 16l4.242-4.242a.999.999 0 000-1.414z"></path>
        </svg>
    );
}

export default CloseIcon;
