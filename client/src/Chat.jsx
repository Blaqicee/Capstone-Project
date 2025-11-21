import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL);

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        socket.on("receiveMessage", message => {
            setMessages(prev => [...prev, message]);
        });
    }, []);

    const sendMessage = () => {
        socket.emit("sendMessage", msg);
        setMsg("");
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">Chat Room</h1>
            <div className="border h-64 overflow-auto mb-2 p-2">
                {messages.map((m, i) => <div key={i}>{m}</div>)}
            </div>
            <input value={msg} onChange={e => setMsg(e.target.value)} className="border p-1 mr-2"/>
            <button onClick={sendMessage} className="bg-green-500 text-white px-2">Send</button>
        </div>
    );
};

export default Chat;
