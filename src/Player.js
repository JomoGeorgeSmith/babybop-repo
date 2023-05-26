


const Player = () => {

    return(
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
            </div>
          </div>
        </div>
      </div>
    )

}

export default Player;