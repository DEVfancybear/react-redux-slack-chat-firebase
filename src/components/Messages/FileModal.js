import React from "react";
import {Modal, Input, Button, Icon, ModalHeader, ModalContent, ModalActions} from "semantic-ui-react";

const FileModal = ({modal, closeModal}) => {
    return (
        <Modal basic open={modal} onClose={closeModal}>
            <ModalHeader>
                Select an Image File
            </ModalHeader>
            <ModalContent>
                <Input fluid label="File types: jpg, png" name="file" type="file"/>
            </ModalContent>
            <ModalActions>
                <Button color="green" inverted><Icon name="checkmark"/> Send</Button>
                <Button color="red" onClick={closeModal} inverted><Icon name="remove"/> Cancel</Button>
            </ModalActions>
        </Modal>
    )
}
export default FileModal