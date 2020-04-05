import React from "react";
import {Grid} from "semantic-ui-react";
import SidePanel from "../SidePanel/SidePanel";
import ColorPanel from "../ColorPanel/ColorPanel";
import Messages from "../Messages/Messages";
import MetaPanel from "../MetaPanel/MetaPanel";
import {connect} from "react-redux";

const Dasboard = ({rootReducers: {currentUser}, reducersChannel: {currentChannel, isPrivateChannel}}) => {
    return (
        <Grid columns="equal" className="app" style={{background: "#eee"}}>
            <ColorPanel/>
            <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser}/>
            <Grid.Column style={{marginLeft: 320}}>
                <Messages key={currentChannel && currentChannel.id} isPrivateChannel={isPrivateChannel}
                          currentUser={currentUser} currentChannel={currentChannel}/>
            </Grid.Column>
            <Grid.Column width={4}>
                <MetaPanel/>
            </Grid.Column>
        </Grid>
    )
}
const mapStateToProps = state => {
    return {
        rootReducers: state.rootReducers,
        reducersChannel: state.reducersChannel
    }
}
export default connect(mapStateToProps, null)(Dasboard);