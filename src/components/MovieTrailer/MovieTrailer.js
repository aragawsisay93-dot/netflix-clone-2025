

// export default MovieTrailer;


import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import "./MovieTrailer.css";

const MovieTrailer = ({ videoId, onClose }) => {
  const playerRef = useRef(null);

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1, // start muted to satisfy browser autoplay policies
      controls: 1,
    },
  };

  // Unmute after autoplay starts
  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setTimeout(() => {
      if (playerRef.current) playerRef.current.unMute();
    }, 500); // short delay to ensure autoplay
  };

  // Close overlay on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="trailer-wrapper">
      {/* Click outside to close */}
      <div className="trailer-backdrop" onClick={onClose}></div>

      <div className="trailer-container">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      </div>
    </div>
  );
};

export default MovieTrailer;
