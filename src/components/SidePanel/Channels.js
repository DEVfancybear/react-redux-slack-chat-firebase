import React, {useState} from "react";
import {Icon, Menu, MenuItem} from "semantic-ui-react";

const Channels = () => {
    const [channels, setChannels] = useState([]);
    return (
        <Menu.Menu style={{paddingBottom: "2em"}}>
            <MenuItem>
                <span>
                    <Icon name="exchange"/> CHANNELS
                </span>
                ({channels.length}) <Icon name="add"/>
            </MenuItem> {""}
            {/*Channels*/}
        </Menu.Menu>
    )
}
export default Channels