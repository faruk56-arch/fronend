import React from 'react'
import { Avatar } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "./SidebarChat.css"
import db from "./firebase"


function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));

    }, [])

    useEffect(() => {
        if (id) {
            db.collection("rooms")
                .doc(id)
                .collection("message")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setMessage(snapshot.docs.map((doc) => doc.data()))
                );
        }

    }, [id])

    const creatChat = () => {
        const roomName = prompt("please enter name of chat room ");
        if (roomName) {
            db.collection("rooms").add({
                name: roomName,
            })

        }
    }



    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{message[0]?.message}</p>
                </div>
            </div>
        </Link>

    ) : (
        <div onClick={creatChat}
            className="sidebarChat">
            <h2>Add new chat</h2>
        </div>
    );
}

export default SidebarChat
