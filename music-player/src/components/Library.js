// import { library } from "@fortawesome/fontawesome-svg-core";


import React from "react";

import LibrarySong from "./LibrarySong";

const Library =({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus})=>{
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''} `}>
            <h2>Library</h2>
            
            <div className="library-songs">
                {/* <LibrarySong/> */}
                
                {songs.map(song =>  <LibrarySong 
                    setSongs={setSongs}
                    isPlaying={isPlaying}
                    song={song} 
                    songs={songs} 
                    setCurrentSong={setCurrentSong}
                    id={song.id} 
                    key={song.id}
                    audioRef={audioRef}
                />)}
            </div>

        </div>
    );
};


export default Library;