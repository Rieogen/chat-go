import React from "react";
import { useCallback, useEffect, useState } from "react";
import { channel, message } from "../types/schema";
import { ChannelCreateModal } from "../components/ChannelCreateModal";
import "./Home.css";
import { useNavigate, useParams } from "react-router";

export const Home: React.FC = () => {
  const [channels, setChannels] = useState<channel[] | undefined>(undefined);
  const [channel, setChannel] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<message[] | undefined>(undefined);

  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);

  const navigate = useNavigate();
  const { channelId } = useParams();

  useEffect(() => {
    fetch("/api/channels")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChannels(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (!channelId) return;
    fetch(`/api/channels/${channelId}`)
      .then((response) => response.json())
      .then((data) => {
        setChannel(data.name);
        setMessages(data.messages);
      })
      .catch((error) => console.error(error));
  }, [channelId]);

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

  const handleChannelClick = useCallback(
    (channelId: number) => {
      navigate(`/channels/${channelId}`);
    },
    [navigate]
  );

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
      <div className="messages">
        <div className="title">
          <h3># {channel}</h3>
        </div>
        <div className="messageList">
          {messages && (
            <ul>
              {messages.map((message) => (
                <li key={message.ID}>
                  <div className="message">
                    <div className="userName">{message.user_name}</div>
                    <div className="content">{message.message}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {createChannelModalOpen && (
        <ChannelCreateModal
          handleModalClose={() => setCreateChannelModalOpen(false)}
          handlePostChannel={handlePostChannel}
        />
      )}
    </div>
  );
};
