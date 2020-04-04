import React, {useState} from "react";
import {Modal, Input, Button, Icon, ModalHeader, ModalContent, ModalActions} from "semantic-ui-react";
import mime from "mime-types";

const FileModal = ({modal, closeModal, uploadFile}) => {
    const [state, setState] = useState({
        file: null,
        authorized: ["image/jpeg", "image/png"]
    });
    const {file,authorized} = state;
    // upload file/images
    const addFile = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setState({
                ...state,
                file
            })
        }
    }
    const sendFile = () => {
        if (file !== null) {
            if (isAuthorized(file.name)) {
                const metadata = {contentType: mime.lookup(file.name)};
                uploadFile(file, metadata);
                closeModal();
                clearFile();
            }
        }
    }
    const clearFile = () => setState({
        ...state, file: null
    })
    const isAuthorized = filename =>
        authorized.includes(mime.lookup(filename));
    return (
        <Modal basic open={modal} onClose={closeModal}>
            <ModalHeader>
                Select an Image File
            </ModalHeader>
            <ModalContent>
                <Input onChange={addFile} fluid label="File types: jpg, png" name="file" type="file"/>
            </ModalContent>
            <ModalActions>
                <Button color="green" onClick={sendFile} inverted><Icon name="checkmark"/> Send</Button>
                <Button color="red" onClick={closeModal} inverted><Icon name="remove"/> Cancel</Button>
            </ModalActions>
        </Modal>
    )
}
export default FileModal