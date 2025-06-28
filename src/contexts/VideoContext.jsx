import React, { createContext, useContext, useState, useEffect } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [selectedVideos, setSelectedVideos] = useState(() => {
    const saved = localStorage.getItem("selectedVideos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("selectedVideos", JSON.stringify(selectedVideos));
  }, [selectedVideos]);

  const addVideo = (video) => {
    setSelectedVideos((prev) => {
      if (prev.find((v) => v.id === video.id)) {
        return prev;
      }
      return [...prev, video];
    });
  };

  const removeVideo = (videoId) => {
    setSelectedVideos((prev) => prev.filter((v) => v.id !== videoId));
  };

  const isVideoSelected = (videoId) => {
    return selectedVideos.some((v) => v.id === videoId);
  };

  const clearAll = () => {
    setSelectedVideos([]);
  };

  return (
    <VideoContext.Provider
      value={{
        selectedVideos,
        addVideo,
        removeVideo,
        isVideoSelected,
        clearAll,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};
