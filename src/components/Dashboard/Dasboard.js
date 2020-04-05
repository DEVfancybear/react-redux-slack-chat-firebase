import React from "react";
import {Grid} from "semantic-ui-react";
import {connect} from "react-redux";
import ColorPanel from "../ColorPanel/ColorPanel";
import SidePanel from "../SidePanel/SidePanel";
import Messages from "../Messages/Messages";
import MetaPanel from "../MetaPanel/MetaPanel";

// prettier-ignore
const Dashboard = ({currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor}) => {
    return (
        <Grid columns="equal" className="app" style={{background: secondaryColor}}>
            <ColorPanel
                key={currentUser && currentUser.name}
                currentUser={currentUser}
            />
            <SidePanel
                key={currentUser && currentUser.uid}
                currentUser={currentUser}
                primaryColor={primaryColor}
            />

            <Grid.Column style={{marginLeft: 320}}>
                <Messages
                    key={currentChannel && currentChannel.id}
                    currentChannel={currentChannel}
                    currentUser={currentUser}
                    isPrivateChannel={isPrivateChannel}
                />
            </Grid.Column>

            <Grid.Column width={4}>
                <MetaPanel
                    key={currentChannel && currentChannel.name}
                    userPosts={userPosts}
                    currentChannel={currentChannel}
                    isPrivateChannel={isPrivateChannel}
                />
            </Grid.Column>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.rootReducers.currentUser,
        currentChannel: state.reducersChannel.currentChannel,
        isPrivateChannel: state.reducersChannel.isPrivateChannel,
        userPosts: state.reducersChannel.userPosts,
        primaryColor: state.reducersColors.primaryColor,
        secondaryColor: state.reducersColors.secondaryColor
    }
}

export default connect(mapStateToProps, null)(Dashboard);