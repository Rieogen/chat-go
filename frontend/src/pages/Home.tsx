import React from "react";
import { useCallback, useEffect, useState } from "react";
import { channel } from "../types/schema";
import { ChannelCreateModal } from "../components/ChannelCreateModal";

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

  return (
    <>
      <div>
        <button onClick={() => setCreateChannelModalOpen(true)}>
          Add Channel
        </button>
      </div>
      <div>
        {channels && (
          <ul style={{ listStyleType: "none" }}>
            {channels.map((channel) => (
              <li key={channel.ID}>{channel.name}</li>
            ))}
          </ul>
        )}
      </div>
      {createChannelModalOpen && (
        <ChannelCreateModal
          handleModalClose={() => setCreateChannelModalOpen(false)}
          handlePostChannel={handlePostChannel}
        />
      )}
    </>
  );
};
