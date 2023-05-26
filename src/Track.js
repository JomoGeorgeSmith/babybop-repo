import React from 'react';


const Track = ({ track, onPlay, isPlaying }) => {
  const { title } = track;

  return (
    <li>
      <button className="trackButton" onClick={onPlay}>{isPlaying ? 'Pause' : 'Play' }</button>
      <span>{title}</span>
    </li>
  );
};

export default Track;


