import React, {Fragment,useState} from "react";
import {Icon, Label, Menu} from "semantic-ui-react";
import {connect} from "react-redux";
import {setCurrentChannel, setPrivateChannel} from "../../actions";
const Starred = () => {
    const [starredChannels,setStarredChannels] = useState([]);
    const [activeChannel, setActiveChannel] = useState('');
    const onSetActiveChannel = channel => {

    };
    const changeChannel = channel => {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
        this.props.setPrivateChannel(false);
    };
    const displayStarred = starredChannels =>
        starredChannels.length > 0 &&
        starredChannels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => this.changeChannel(channel)}
                name={channel.name}
                style={{opacity: 0.7}}
                active={channel.id === this.state.activeChannel}
            >
                # {channel.name}
            </Menu.Item>
        ));
    return (
        <Fragment>
            <Menu.Menu className="menu">
                <Menu.Item>
            <span>
              <Icon name="star"/> STARRED
            </span>{" "}
                    ({starredChannels.length})
                </Menu.Item>
                {displayStarred(starredChannels)}
            </Menu.Menu>
        </Fragment>
    )
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setCurrentChannel: channel => {
            dispatch(setCurrentChannel(channel))
        },
        setPrivateChannel: isPrivateChannel => {
            dispatch(setPrivateChannel(isPrivateChannel))
        }
    }
}
export default connect(null, mapDispatchToProps)(Starred);