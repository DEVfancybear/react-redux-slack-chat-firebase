import React, {useState} from "react";
import {Icon, MenuItem, MenuMenu} from "semantic-ui-react";

const DirectMessages = () => {
    const [users, setUsers] = useState([]);
    return (
        <MenuMenu className="menu">
            <MenuItem>
                <span>
                    <Icon name="mail"/> DIRECT MESSAGES
                </span> {''}
                ({users.length})
            </MenuItem>
            {/*Users to Send Direct Messages*/}
        </MenuMenu>
    )
}
export default DirectMessages;