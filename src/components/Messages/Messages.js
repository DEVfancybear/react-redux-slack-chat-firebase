import React, {Fragment, useState, useEffect} from "react";
import {Segment, CommentGroup} from "semantic-ui-react"
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";
import Message from "./Message";

const Messages = ({currentChannel, currentUser}) => {
    const [state, setState] = useState({
        messagesRef: firebase.database().ref("messages"),
        messages: [],
        messagesLoading: true,
        numUniqueUsers: ""
    });
    useEffect(() => {
        if (currentChannel && currentUser) {
            addListeners(currentChannel.id);
        }
    }, [currentUser, currentChannel]);
    const addListeners = channelId => {
        addMessageListener(channelId);
    };

    const addMessageListener = channelId => {
        let loadedMessages = [];
        state.messagesRef.child(channelId).on("child_added", snap => {
            loadedMessages.push(snap.val());
            setState({
                ...state,
                messages: loadedMessages,
                messagesLoading: false
            });
            countUniqueUsers(loadedMessages);
        });
    };

    const countUniqueUsers = messages => {
        const uniqueUsers = messages.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }
            return acc;
        }, []);
        const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
        const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
        setState({
            ...state,
            numUniqueUsers
        })
    };

    const displayMessages = messages =>
        messages.length > 0 &&
        messages.map(message => (
            <Message
                key={message.timestamp}
                message={message}
                user={currentUser}
            />
        ));
    const displayNameChannel = channel => channel ? `#${channel.name}` : "";
    return (
        <Fragment>
            <MessagesHeader numUniqueUsers={state.numUniqueUsers} displayNameChannel={displayNameChannel(currentChannel)}/>
            <Segment>
                <CommentGroup className="messages">{displayMessages(state.messages)}</CommentGroup>
            </Segment>
            <MessageForm currentChannel={currentChannel} currentUser={currentUser} messagesRef={state.messagesRef}/>
        </Fragment>
    )
}

export default Messages