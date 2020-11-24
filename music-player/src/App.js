import React,{useRef,useState} from "react";

import './styles/app.scss';

import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

import Nav from "./components/Nav";


import data from "./data";


function App() {

  const audioRef = useRef(null);

  const[songs, setSongs] = useState(data());
  const[currentSong, setCurrentSong] = useState(songs[0]);
  const[isPlaying, setIsPlaying] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });


  //code for toogle
  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => { 
    const current = e.target.currentTime; 
    const duration = e.target.duration;
    //calculate percentage
    const roundedCurrent = Math.round(current)
    // console.log(roundedCurrent);
    const roundedDuration = Math.round(duration)

    const animation = Math.round((roundedCurrent/ roundedDuration)* 100)

    // // console.log((roundedCurrent/ roundedDuration)* 100);
    // // console.log(roundedDuration);
    // console.log(animation);

    setSongInfo({
      ...songInfo, 
      currentTime: current, 
      duration, 
      animationPercentage:animation 
    })
    
    // console.log(duration);
  };


  const songEndHandler = async (e) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

        if(isPlaying) audioRef.current.play();
        // console.log(`next index ${currentIndex + 1}`);
        // console.log(`songs length ${songs.length}`);
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
        {/*state is being passed down */}
        <Song currentSong={currentSong}/>
        <Player 
          songs={songs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          setIsPlaying={setIsPlaying} 
          isPlaying={isPlaying} 
          setSongInfo={setSongInfo}
          songInfo={songInfo}
          currentSong={currentSong}
          setSongs={setSongs}
          />

        <Library 
          libraryStatus={libraryStatus}
          songs={songs} 
          setSongs={setSongs}
          audioRef={audioRef} 
          isPlaying={isPlaying}
          setCurrentSong={setCurrentSong} 
        />


        {/*on time update event for audio time */}
        <audio  
          onLoadedMetadata={timeUpdateHandler}
          onTimeUpdate={timeUpdateHandler} 
          ref={audioRef} 
          src={currentSong.audio}
          onEnded={songEndHandler}  
        >
        
       </audio>

    </div>

    
  );
}

export default App;
