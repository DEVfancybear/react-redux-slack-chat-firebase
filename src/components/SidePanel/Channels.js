import React, {useState, Fragment} from "react";
import {
    Icon,
    Menu,
    MenuItem,
    Modal,
    ModalContent,
    ModalHeader,
    Form,
    FormField,
    Input,
    ModalActions,
    Button
} from "semantic-ui-react";
import firebase from "../../firebase"

const Channels = ({currentUser}) => {
    const [state, setState] = useState({
        channels: [],
        modal: false,
        channelName: "",
        channelDetails: "",
        channelsRef: firebase.database().ref('channels')
    })
    const closeModal = () => {
        setState({
            ...state,
            modal: false
        })
    };


    const onHandleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setState({
            ...state,
            [name]: value
        })
    }
    const openModal = () => {
        setState({
            ...state,
            modal: true
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        //check form valid xem có đủ các trường không
        if (isFormValid(state)) {
            // console.log('channel added');
            addChannel();
        }
    }
    // gửi các trường dữ liệu là các state tương ứng lên firebase
    const addChannel = () => {
        const {channelsRef, channelName, channelDetails} = state;
        const key = channelsRef.push().key;
        // các trường ở firebase sẽ có các state tương ứng để lưu vào database firebase
        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: currentUser.displayName,
                avatar: currentUser.photoURL
            }
        };
        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                setState({
                    ...state,
                    channelName: "",
                    channelDetails: ""
                });
                closeModal();
                console.log('channel added');
            })
            .catch(err => {
                console.log(err)
            })
    }
    // ({channelName, channelDetails}) là tham số có tên giống với state để kiểm tra xem form gửi có đủ trường k,nếu k đủ thì sẽ k cho gửi
    const isFormValid = ({channelName, channelDetails}) => channelName && channelDetails;
    return (
        <Fragment>
            <Menu.Menu style={{paddingBottom: "2em"}}>
                <MenuItem>
                <span>
                    <Icon name="exchange"/> CHANNELS
                </span>
                    ({state.channels.length}) <Icon name="add" onClick={openModal}/>
                </MenuItem> {""}
                {/*Channels*/}
                <Modal basic open={state.modal} onClose={closeModal}>
                    <ModalHeader>
                        Add a channel
                    </ModalHeader>
                    <ModalContent>
                        <Form>
                            <FormField>
                                <Input fluid label="Name of Channel" name="channelName" onChange={onHandleChange}/>
                            </FormField>
                            <FormField>
                                <Input fluid label="About the Channel" name="channelDetails" onChange={onHandleChange}/>
                            </FormField>
                        </Form>
                    </ModalContent>
                    <ModalActions>
                        <Button color="green" inverted onClick={handleSubmit}>
                            <Icon name="checkmark"/> Add
                        </Button>
                        <Button color="red" inverted onClick={closeModal}>
                            <Icon name="remove"/> Cancel
                        </Button>
                    </ModalActions>
                </Modal>
            </Menu.Menu>
        </Fragment>
    )
}
export default Channels