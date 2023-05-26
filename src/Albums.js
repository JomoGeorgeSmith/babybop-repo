import React, { useState, useRef, useEffect } from 'react';
import Album from './Album';
import data from './data.json';
import MyNavbar from './MyNavbar';
import ReactAudioPlayer from 'react-audio-player';

const Albums = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(null);
  const audioPlayerRef = useRef(null);

  const updatePlayingTrackIndex = (newIndex) => {
    setCurrentTrackIndex(newIndex);
  };

  const handlePlayTrack = (trackIndex, albumIndex) => {
    setCurrentTrackIndex(trackIndex);
    setCurrentAlbumIndex(albumIndex);
  };

  const handleTrackEnd = () => {
    // If there is a current track and it is not the last track in the album
    if (currentTrackIndex !== null && currentTrackIndex < data[currentAlbumIndex].tracks.length - 1) {
      // Play the next track
      const tracks = document.querySelectorAll('.trackList');
      tracks.forEach(track => track.classList.remove('playing'));
      // tracks[currentTrackIndex +  1].classList.add('playing');
      document.querySelector(`.trackList:nth-child(${currentTrackIndex + 2})`).classList.add('playing')
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const handleNextTrack = (albumIndex) => {
    if (currentTrackIndex !== null && currentTrackIndex < data[currentAlbumIndex].tracks.length - 1) {
      const tracks = document.querySelectorAll('.trackList');
      tracks.forEach(track => track.classList.remove('playing'));
      document.querySelector(`.trackList:nth-child(${currentTrackIndex + 2})`).classList.add('playing');
      setCurrentTrackIndex(currentTrackIndex + 1);
      updatePlayingTrackIndex(currentTrackIndex + 1);
      setCurrentAlbumIndex(albumIndex);
    }
  };

  const handlePreviousTrack = (albumIndex) => {
    if (currentTrackIndex !== null && currentTrackIndex > 0) {
      const tracks = document.querySelectorAll('.trackList');
      tracks.forEach(track => track.classList.remove('playing'));
      // tracks[currentTrackIndex -  1].classList.add('playing');
      document.querySelector(`.trackList:nth-child(${currentTrackIndex})`).classList.add('playing')
      setCurrentTrackIndex(currentTrackIndex - 1);
      document.querySelector(`.trackList:nth-child(${currentTrackIndex})`).classList.add('playing')
      setCurrentAlbumIndex(albumIndex);
    }
  };

  // const handleAlbumEnd = (albumId) => {
  //   //look if we are at the last track
  //   if (currentTrackIndex === album.TrackCount) {
  //     const tracks = document.querySelectorAll('.trackList');
  //     tracks.forEach(track => track.classList.remove('playing'));
  //     var nexAlbumId = album.TrackCount + 1;
  //     console.log("Next Album" +  nextAlbumId)
  //     //var nextAlbum = getAlbumById(nexAlbumId);   
  //   }

  // }

  function getAlbumById(id) {
    var album = data.find(function (id) {
      return album.id === id;
    });

    if (album) {
      console.log("Album found:");
      console.log(album);
      // Do something with the album object
    } else {
      console.log("Album not found");
    }
  }

return (
  <div>
    {/* <MyNavbar /> */}
    <div className="albums">
      {data.map((album) => (
        <Album key={album.id} album={album} handlePlayTrack={handlePlayTrack} currentTrackIndex={currentTrackIndex} currentAlbumIndex={album.id} />
      ))}
    </div>
    <div className="playerArea">
      <div className="row">
        <div className="col-lg-1 thumbnailCol">
          {currentTrackIndex !== null && (
            <div className="thumbnail  mx-auto">
              <img src={data[currentAlbumIndex].coverUrl} alt="Album cover" />
            </div>
          )}
        </div>
        <div className="col-lg-2 trackInfoCol">
          {currentTrackIndex !== null && (
            <div className="trackInfo">
              <div className="trackName">{data[currentAlbumIndex].tracks[currentTrackIndex].title}</div>
              <div className="artistName">{data[currentAlbumIndex].artist}</div>
            </div>
          )}
        </div>
        <div className="col-lg-6  reactPlayerCol my-auto">
          <div className="musicPlayer w-50 mx-auto ">
            <ReactAudioPlayer
              className="reactPlayer"
              src={currentTrackIndex !== null ? data[currentAlbumIndex].tracks[currentTrackIndex].audioUrl : ''}
              controls
              ref={audioPlayerRef}
              autoPlay
              onEnded={handleTrackEnd}
            />
            <div className="d-flex justify-content-center mt-2">
              <button className="btn btn-secondary mx-2" onClick={() => handlePreviousTrack(currentAlbumIndex)}>Prev</button>
              <button className="btn btn-secondary mx-2" onClick={() => handleNextTrack(currentAlbumIndex)}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
          }
export default Albums;
