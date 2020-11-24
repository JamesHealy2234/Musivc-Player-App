import React from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause,} from "@fortawesome/free-solid-svg-icons";

// import {playAudio} from "../util";

const Player =  ({
    audioRef, 
    currentSong,
    id, 
    isPlaying, 
    setIsPlaying, 
    setSongInfo, 
    songInfo,
    songs,
    setSongs,
    setCurrentSong
    })=> {

    
        const activeLibraryHandler = (nextPrev) =>{
            const newSongs = songs.map((song) => {
                if(song.id === nextPrev.id){
                    return{
                        ...song,
                        active: true,
                    };
                } else {
                    return {
                        ...song,
                        active: false,
                    };
                }
            });
           
        setSongs(newSongs);
        console.log("some stuff");
        }


    // event handlers Functions
    const playSongHandler =() => {

        if(isPlaying){
            audioRef.current.pause();
            //when clicked setIsPlaying to opposite of what it was 
            setIsPlaying(!isPlaying);
        }
        else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
        //use reference --> when you need to select a specific HTML tag in reference
        // console.log(audioRef.current);
    };



    //formatting the time
    const getTime =(time) => {
        return(
            // Math.floor(time/ 60) + ':' + ("0" + Math.floor(time % 60)).slice(-2)
            Math.floor(time/60) + ':' + ("0" + Math.floor(time % 60)).slice(-2) //output 0 
        )
    };

    const dragHandler =(e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo,currentTime: e.target.value });
    };

    //Code to skip forward and back:


    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        if(direction ==="skip-forward"){
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
            // console.log(`next index ${currentIndex + 1}`);
            // console.log(`songs length ${songs.length}`);
        }   
        if(direction ==="skip-back"){
            if((currentIndex -1) % songs.length === -1){

            await setCurrentSong(songs[songs.length -1]);
                if(isPlaying) audioRef.current.play();

                activeLibraryHandler(songs[songs.length -1]);
                // playAudio(isPlaying, audioRef); --> old Cod
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }     

        if(isPlaying) audioRef.current.play();
        // console.log(currentIndex+1);
    };







    // const skipTrackHandler = (direction) =>{

    //     if(typeof direction !== 'number') {
    //         const currentIndex = songs.findIndex(t => t.id ===currentSong.id)
    //         }
    //         if(currentIndex < 1 && direction < 0) setCurrentSong(songs[songs.length-1])
        
            

    //     }
    // }
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    };

    return(
        <div className="player">
           <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>

                <div  style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input  
                        min={0} 
                        onChange={dragHandler}
                        // how to fix the Nan error "|| or 0 before player loads "
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        type="range"
                            
                    />
                    <div style={trackAnim} className="animate-track">

                    </div>

                </div>
                
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00" }</p>

           </div>
           <div className="play-control">

                <FontAwesomeIcon 
                    onClick={()=>skipTrackHandler('skip-back')}
                    className="skip-back" 
                    size="2x" 
                    icon={faAngleLeft}
                />

                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size="2x" 
                    icon={isPlaying ? faPause : faPlay }
                    
                />

                <FontAwesomeIcon 
                    onClick={()=>skipTrackHandler('skip-forward')}
                    className="skip-forward" 
                    size="2x" 
                    icon={faAngleRight}
                />
           </div>
        </div>

    );
};

export default Player;