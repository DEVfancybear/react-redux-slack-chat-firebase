import React, {useState} from "react";
import {Segment, Input, Button, ButtonGroup} from "semantic-ui-react";
import firebase from "../../firebase";
import FileModal from "./FileModal";

const MessageForm = ({messagesRef, currentChannel, currentUser}) => {
    const [state, setState] = useState({
        message: "",
        loading: false,
        errors: [],
        modal: false
    })
    const openModal = () => setState({
        ...state,
        modal: true
    })
    const closeModal = () => setState({
        ...state,
        modal: false
    })
    const onHandleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setState({
            ...state,
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
            content: state.message
        };
        return message;
    }
    const sendMessage = () => {
        if (state.message) {
            setState({
                ...state,
                loading: true
            })
            messagesRef
                .child(currentChannel.id)
                .push()
                .set(createMessage())
                .then(() => {
                    setState({
                        ...state,
                        loading: false,
                        message: '',
                        errors: []
                    })
                })
                .catch(err => {
                    console.log(err);
                    setState({
                        ...state,
                        loading: false,
                        errors: state.errors.concat(err)
                    })
                })
        } else {
            setState({
                ...state,
                errors: state.errors.concat({message: "Add a message ..."})
            })
        }
    }

    const uploadFile = (file, metadata) => {
        console.log(file, metadata)
    }

    return (
        <Segment className="message__form">
            <Input
                fluid
                onChange={onHandleChange}
                name="message"
                value={state.message}
                style={{marginBottom: "0.7em"}}
                label={<Button icon={"add"}/>}
                labelPosition="left"
                className={
                    state.errors.some(error => error.message.includes("message"))
                        ? "error"
                        : ""
                }
                placeholder="Write your message"
            />
            <ButtonGroup icon widths="2">
                <Button
                    onClick={sendMessage}
                    color="orange"
                    disabled={state.loading}
                    content="Add Reply"
                    labelPosition="left"
                    icon="edit"
                />
                <Button
                    onClick={openModal}
                    color="teal"
                    content="Upload Media"
                    labelPosition="right"
                    icon="cloud upload"
                />
                <FileModal uploadFile={uploadFile} closeModal={closeModal} modal={state.modal}/>
            </ButtonGroup>
        </Segment>
    )
}
export default MessageForm;