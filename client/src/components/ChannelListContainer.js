import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";

import HospitalIcon from "../assets/hospital.png";
import Logout from "../assets/logout.png";
import { initialState } from "stream-chat-react/dist/components/Channel/channelState";

const cookies = new Cookies();

const Sidebar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt={"hospital"} width={"30"} />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={Logout} alt="Logout" width={"30"} />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className={"channel-list__header"}>
    <p className={"channel-list__header__text"}>Medical Chat</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};
const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("phoneNumber");
    cookies.remove("hashedPassword");

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <Sidebar logout={logout} />
      <div className={"channel-list__list__wrapper"}>
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              type="team"
              {...listProps}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              type={"team"}
              setToggleContainer={setToggleContainer}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              type={"messaging"}
              {...listProps}
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type={"team"}
              setToggleContainer={setToggleContainer}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);
  return (
    <>
      <div className={"channel-list__container"}>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <div
          className={"channel-list__container-responsive"}
          style={{
            left: toggleContainer ? "0" : "-89%",
            backgroundColor: "#005fff",
          }}
        >
          <div
            className={"channel-list__container-toggle"}
            onClick={() => setToggleContainer((prevState) => !prevState)}
          ></div>
          <ChannelListContent
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
          />
        </div>
      </div>
    </>
  );
};

export default ChannelListContainer;
