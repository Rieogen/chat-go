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
  const [channelTitle, setChannelTitle] = React.useState<string>("");

  const handleChannelTitleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChannelTitle(e.target.value);
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
            value={channelTitle}
            onChange={handleChannelTitleInputChange}
          />
          <button onClick={handleModalClose}>キャンセル</button>
          <button
            disabled={!channelTitle}
            onClick={() => handlePostChannel(channelTitle)}
          >
            作成
          </button>
        </div>
      </div>
    </>
  );
};
