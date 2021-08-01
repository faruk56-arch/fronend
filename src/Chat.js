import React from 'react'
import { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVert from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic'
import { useParams } from "react-router-dom"
import firebase from 'firebase'
import { useStateValue } from "./StateProvider"
import "./Chat.css"
import db from './firebase';


function Chat() {
    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")
    const { roomId } = useParams()
    const [roomName, setRoomName] = useState("");
    const [message, setMessage] = useState([])
    const [{ user }, dispatch] = useStateValue();


    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

            db.collection('rooms')
                .doc(roomId)
                .collection("message")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) =>
                    setMessage(snapshot.docs.map((doc) =>
                        doc.data()))
                );
        }

    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))

    }, [roomId])
    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('rooms').doc(roomId).collection
            ("message").add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.
                    serverTimestamp(),
            })

        setInput("");

    }
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen {""}
                        {message[message.length - 1]?.
                            timestamp?.toDate().toUTCString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>



            <div className="chat_body">

                {message.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && "chat_recevoir"}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>

                ))}

            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form type="text">
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message" />

                    <button type="submit" onClick={sendMessage} >Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
