import React, {Fragment} from "react";
import {Segment, CommentGroup} from "semantic-ui-react"
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";

const Messages = () => {
    return (
        <Fragment>
            <MessagesHeader/>
            <Segment>
                <CommentGroup className="messages">{/* Messages */}</CommentGroup>
            </Segment>
            <MessageForm/>
        </Fragment>
    )
}

export default Messages