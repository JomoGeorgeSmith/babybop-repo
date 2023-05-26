import React, { useState, useEffect } from 'react';

const Album = ({ album, handlePlayTrack, currentTrackIndex, currentAlbumIndex }) => {
  const { coverUrl, title, artist, tracks } = album;
  const [playingTrackIndex, setPlayingTrackIndex] = useState(-1);
  const [playingAlbumIndex , setPlayingAlbumIndex] =  useState(-1);
  const [isPlaying, setIsPlaying] = useState('');

  const handleTrackClick = (index, e) => {
    const currentPlaying = document.querySelector('.playing');
    if (currentPlaying) {
      currentPlaying.classList.remove('playing');
    }
    e.currentTarget.classList.add('playing');
    setPlayingTrackIndex(index);
    handlePlayTrack(index, currentAlbumIndex);
    setPlayingAlbumIndex(currentAlbumIndex)
  };

  const handlePlayProject = (albumIndex) => {
    const tracks = document.querySelectorAll('.trackList');
    tracks.forEach(track => track.classList.remove('playing'));
    handlePlayTrack(0, albumIndex);
    const playingElement = document.querySelector(".trackList");
    if (playingElement) {
      playingElement.classList.add('playing');
    }
    setPlayingTrackIndex(0);
    setPlayingAlbumIndex(albumIndex);
  };

  return (
    <div className="album row">
      <div className="col">
        <img src={coverUrl} alt={title} />
      </div>
      <div className="col">
        <h2 className="Album Title">{title}</h2>
        <h3 className="Artist Name">{artist}</h3>
      </div>
      <div class="button-container">
        <button onClick={() => handlePlayProject(currentAlbumIndex)}>
          <span>Play</span>
        </button>
      </div>
      <ul className="row">

        {tracks.map((track, index) => (
          
          <li
            key={index}
            className={`row trackList ${playingTrackIndex === index   ? 'playing' : ''}`}
            onClick={(e) => handleTrackClick(index, e)}
          >
      {console.log(track.title + '  trackIndex: ' + index  + ' ' + 'playing Track Index :  ' + playingTrackIndex)}
            <span>{track.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Album;

