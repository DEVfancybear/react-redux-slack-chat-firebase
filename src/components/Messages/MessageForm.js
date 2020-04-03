import React, {useState} from "react";
import {Segment, Input, Button, ButtonGroup} from "semantic-ui-react";
import firebase from "../../firebase";

const MessageForm = ({messagesRef, currentChannel, currentUser}) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const onHandleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setMessage({
            ...message,
            [name]: value
        })
    }
    const createMessage = () => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: currentUser.uid,
                name: currentUser.displayName,
                avatar: currentUser.photoURL
            },
            content: message
        };
        return message;
    }
    const sendMessage = () => {
        if (message) {
            setLoading(true);
            messagesRef
                .child(currentChannel.id)
                .push()
                .set(createMessage())
                .then(() => {
                    setLoading(false);
                    setMessage('');
                    setErrors([]);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    setErrors(errors.concat(err));
                })
        } else {
            setErrors(errors.concat({message: "Add a message..."}))
        }
    }
    return (
        <Segment className="message__form">
            <Input
                fluid
                onChange={onHandleChange}
                name="message"
                style={{marginBottom: "0.7em"}}
                label={<Button icon={"add"}/>}
                labelPosition="left"
                className={
                    errors.some(error => error.message.includes("message"))
                        ? "error"
                        : ""
                }
                placeholder="Write your message"
            />
            <ButtonGroup icon widths="2">
                <Button
                    onClick={sendMessage}
                    color="orange"
                    content="Add Reply"
                    labelPosition="left"
                    icon="edit"
                />
                <Button
                    color="teal"
                    content="Upload Media"
                    labelPosition="right"
                    icon="cloud upload"
                />
            </ButtonGroup>
        </Segment>
    )
}
export default MessageForm;