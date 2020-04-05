import React, {useState, useEffect} from "react";
import {Icon, MenuItem, MenuMenu} from "semantic-ui-react";
import firebase from "../../firebase";

const DirectMessages = ({currentUser}) => {
    const [users, setUsers] = useState([]);
    const [usersRef, setUsersRef] = useState(firebase.database().ref('users'));
    const [connectedRef, setConnectedRef] = useState(firebase.database().ref(".info/connected"));
    const [presenceRef, setPresence] = useState(firebase.database().ref('presence'));
    useEffect(() => {
        if (currentUser) {
            addListeners(currentUser.uid)
        }
    }, [currentUser]);
    const addListeners = currentUserId => {
        let loadedUsers = [];
        usersRef.on('child_added', snap => {
            if (currentUserId !== snap.key) {
                let user = snap.val();
                user['uid'] = snap.key;
                user['status'] = 'offline';
                loadedUsers.push(user);
                setUsers(loadedUsers);

            }
        });
        connectedRef.on('value', snap => {
            if (snap.val() === true) {
                const ref = presenceRef.child(currentUserId);
                ref.set(true);
                ref.onDisconnect().remove(err => {
                    if (err !== null) {
                        console.error(err);
                    }
                })
            }
        });
        presenceRef.on('child_added', snap => {
            if (currentUserId !== snap.key) {
                //add status to user
                addStatusToUser(snap.key);
            }
        })
        presenceRef.on('child_removed', snap => {
            if (currentUserId !== snap.key) {
                addStatusToUser(snap.key, false);

            }
        })
    }
    const addStatusToUser = (userId, connected = true) => {
        const updatedUsers = users.reduce((acc, user) => {
            if (user.id === userId) {
                user['status'] = `${connected ? 'online' : 'offline'}`;

            }
            return acc.concat(user)
        }, []);
        setUsers(updatedUsers);
    }
    const isUserOnLine = user => user.status === 'online';
    return (
        <MenuMenu className="menu">
            <MenuItem>
                <span>
                    <Icon name="mail"/> DIRECT MESSAGES
                </span> {''}
                ({users.length})
            </MenuItem>
            {/*Users to Send Direct Messages*/}
            {users.map((user, index) => {
                return (
                    <MenuItem key={index} onClick={() => console.log(user)} style={{opacity: 0.7, fontStyle: 'italic'}}>
                        <Icon name="circle" color={isUserOnLine(user) ? 'green' : 'ref'}/>
                        @ {user.name}
                    </MenuItem>
                )
            })}
        </MenuMenu>
    )
}
export default DirectMessages;