import React from "react";
import "./ChannelCreateModal.css";

export type ChannelCreateModalProps = {
  handleModalClose: () => void;
  handlePostChannel: (channelName: string) => void;
};
export const ChannelCreateModal: React.FC<ChannelCreateModalProps> = ({
  handleModalClose,
  handlePostChannel,
}) => {
  const [channelName, setChannelName] = React.useState<string>("");

  const handleChannelNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChannelName(e.target.value);
  };

  return (
    <>
      <div className="overlay" onClick={handleModalClose} />
      <div className="ChannelCreateModal">
        <h2>チャンネルを作成</h2>
        <div className="ChannelCreateForm">
          <input
            type="text"
            className="ChannelNameInput"
            value={channelName}
            onChange={handleChannelNameInputChange}
          />
          <button onClick={handleModalClose}>キャンセル</button>
          <button
            disabled={!channelName}
            onClick={() => handlePostChannel(channelName)}
          >
            作成
          </button>
        </div>
      </div>
    </>
  );
};
