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

const Channels = () => {
    const [channels, setChannels] = useState([]);
    const [modal, setModal] = useState(false);
    const closeModal = () => {
        setModal(false)
    };
    const [form, setForm] = useState({
        channelName: "",
        channelDetails: ""
    })
    const onHandleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setForm({
            ...form,
            [name]: value
        })
    }
    const openModal = () => {
        setModal(true);
    }
    return (
        <Fragment>
            <Menu.Menu style={{paddingBottom: "2em"}}>
                <MenuItem>
                <span>
                    <Icon name="exchange"/> CHANNELS
                </span>
                    ({channels.length}) <Icon name="add" onClick={openModal}/>
                </MenuItem> {""}
                {/*Channels*/}
                <Modal basic open={modal} onClose={closeModal}>
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
                        <Button color="green" inverted>
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