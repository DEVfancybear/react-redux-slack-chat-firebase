import React, {Fragment, useState} from "react";
import {Segment, CommentGroup} from "semantic-ui-react"
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";

const Messages = ({currentChannel,currentUser}) => {
    const [messagesRef, setMessagesRef] = useState(firebase.database().ref('messages'))
    return (
        <Fragment>
            <MessagesHeader/>
            <Segment>
                <CommentGroup className="messages">{/* Messages */}</CommentGroup>
            </Segment>
            <MessageForm currentChannel={currentChannel} currentUser={currentUser} messagesRef={messagesRef}/>
        </Fragment>
    )
}

export default Messages