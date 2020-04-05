import React from "react";
import {Header, Segment, Input, Icon} from "semantic-ui-react";

const MessagesHeader = ({channelName, numUniqueUsers, handleSearchChange, searchLoading, isPrivateChannel, isChannelStarred,handleStar}) => {
    return (
        <Segment clearing>
            {/* Channel Title */}
            <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0}}>
          <span>
              {channelName}
              {!isPrivateChannel && (
                  <Icon
                      onClick={handleStar}
                      name={isChannelStarred ? "star" : "star outline"}
                      color={isChannelStarred ? "yellow" : "black"}
                  />
              )}
          </span>
                <Header.Subheader>{numUniqueUsers}</Header.Subheader>
            </Header>

            {/* Channel Search Input */}
            <Header floated="right">
                <Input
                    loading={searchLoading}
                    onChange={handleSearchChange}
                    size="mini"
                    icon="search"
                    name="searchTerm"
                    placeholder="Search Messages"
                />
            </Header>
        </Segment>
    )
}
export default MessagesHeader