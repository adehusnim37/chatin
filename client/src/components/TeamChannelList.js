import React from "react";

import { AddChannel } from "../assets";

const TeamChannelList = ({
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  if (error) {
    return type === "team" ? (
      <div className={"team-channel-list"}>
        <p className={"team-channel-list__message"}>
          Koneksi error, tunggu sebentar ya
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return type === "team" ? (
      <div className={"team-channel-list"}>
        <p className={"team-channel-list__message"}>
          {type === "team" ? "Channels" : "Messages"} loading ...
        </p>
      </div>
    ) : null;
  }

  return (
    <div className={"team-channel-list"}>
      <div className={"team-channel-list__header"}>
        <p className={"team-channel-list__header__title"}>
          {type === "team" ? "Channels" : "Direct Messages"}
        </p>
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === "team" ? "team" : "messaging"}
          setToggleContainer={setToggleContainer}
        />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
