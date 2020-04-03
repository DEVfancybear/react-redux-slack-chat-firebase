import React from "react";
import {Grid} from "semantic-ui-react";
import SidePanel from "../SidePanel/SidePanel";
import ColorPanel from "../ColorPanel/ColorPanel";
import Messages from "../Messages/Messages";
import MetaPanel from "../MetaPanel/MetaPanel";
import {connect} from "react-redux";
const Dasboard = ({rootReducers: {currentUser}}) => {
    return (
        <Grid columns="equal" className="app" style={{background: "#eee"}}>
            <ColorPanel/>
            <SidePanel currentUser={currentUser}/>
            <Grid.Column style={{marginLeft: 320}}>
                <Messages/>
            </Grid.Column>
            <Grid.Column width={4}>
                <MetaPanel/>
            </Grid.Column>
        </Grid>
    )
}
const mapStateToProps = state => {
    return {
        rootReducers: state.rootReducers
    }
}
export default connect(mapStateToProps, null)(Dasboard);