import React from "react";
import {Grid, GridColumn, GridRow, Header, HeaderContent, Icon, Dropdown} from "semantic-ui-react";
import firebase from "../../firebase";

const UserPanel = () => {
    const dropdownOptions = () => [
        {
            key: "user",
            text: <span>Signed in as <strong>User</strong></span>,
            disable: +true
        },
        {
            key: "avatar",
            text: <span>Change avatar</span>
        },
        {
            key: "signout",
            text: <span onClick={handleSignOut}>Sign Out</span>
        }
    ]
    // xử lí đăng xuất khi click
    const handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('signed out !')
            })
    }
    return (
        <Grid style={{background: "#4c3c4c"}}>
            <GridColumn>
                <GridRow style={{padding: "1.2rem", margin: "0"}}>
                    <Header inverted floated="left" as="h2">
                        <Icon name="code"/>
                        <HeaderContent>
                            Slack Chat
                        </HeaderContent>
                    </Header>
                </GridRow>
                {/*User Dropdown*/}
                <Header style={{padding: "0.2em"}} inverted as="h4">
                    <Dropdown
                        trigger={<span>User</span>}
                        options={dropdownOptions()}
                    />
                </Header>
            </GridColumn>
        </Grid>
    )
}
export default UserPanel