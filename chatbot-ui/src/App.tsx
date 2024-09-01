import './App.css';
import {useEffect, useState} from "react";
import io from "socket.io-client";
import TreeIcon from "./icons/Tree";
import ArrowRight from "./icons/ArrowRight";
import IntentHeaders from "./components/IntentsHeaders";
import BookIcon from "./icons/Book";
import ChatIcon from "./icons/Chat";
import LeafIcon from "./icons/Leaf";
import AvatarManIcon from "./icons/AvatarMan";
import ExpandIcon from "./icons/Expand";
import CloseIcon from "./icons/Close";
import RobotIcon from "./icons/Robot";
import Header from "./components/Header";
import {Outlet} from "react-router-dom";


function App() {
    return (
        <div className="flex relative flex-col h-full w-full bg-white rounded-xl overflow-hidden shadow-xl">
            <Header/>
            <div id={'content'} className={'relative h-full '}>
                <Outlet/>
            </div>
            <div id={'footer'}></div>
        </div>
    );
}

export default App;

