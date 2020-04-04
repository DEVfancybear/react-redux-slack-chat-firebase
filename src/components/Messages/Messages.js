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
        messagesLoading: true
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
        });
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
    return (
        <Fragment>
            <MessagesHeader/>
            <Segment>
                <CommentGroup className="messages">{displayMessages(state.messages)}</CommentGroup>
            </Segment>
            <MessageForm currentChannel={currentChannel} currentUser={currentUser} messagesRef={state.messagesRef}/>
        </Fragment>
    )
}

export default Messages