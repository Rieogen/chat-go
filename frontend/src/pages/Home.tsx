import React from "react";
import { useCallback, useEffect, useState } from "react";
import { channel } from "../types/schema";
import { ChannelCreateModal } from "../components/ChannelCreateModal";
import "./Home.css";

export const Home: React.FC = () => {
  const [channels, setChannels] = useState<channel[] | undefined>(undefined);
  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/channels")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChannels(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handlePostChannel = useCallback(async (channelName: string) => {
    if (!channelName) {
      setCreateChannelModalOpen(false);
      return;
    }

    try {
      const response = await fetch("/api/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: channelName }),
      });

      if (!response.ok) {
        throw new Error("Failed to post channel");
      }
      const newChannel = await response.json();
      setChannels((prevChannels) =>
        prevChannels ? [...prevChannels, newChannel] : [newChannel]
      );

      setCreateChannelModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleChannelClick = useCallback(async (channelId: number) => {
    try {
      const response = await fetch(`/api/channels/${channelId}`);
      if (!response.ok) {
        throw new Error("Failed to get channel");
      }
      const channel = await response.json();
      console.log(channel);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="HomeContainer">
      <div className="pageTitle">
        <h2>home</h2>
      </div>
      <div className="channels">
        <div className="title">
          <h3>Channels</h3>
          <button onClick={() => setCreateChannelModalOpen(true)}>
            +<span className="tooltip">チャンネルを作成</span>
          </button>
        </div>
        <div className="channelList">
          {channels && (
            <ul>
              {channels.map((channel) => (
                <li key={channel.ID}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleChannelClick(channel.ID);
                    }}
                  >
                    # {channel.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="messages"></div>
      {createChannelModalOpen && (
        <ChannelCreateModal
          handleModalClose={() => setCreateChannelModalOpen(false)}
          handlePostChannel={handlePostChannel}
        />
      )}
    </div>
  );
};
