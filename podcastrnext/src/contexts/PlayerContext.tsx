import React, { ReactNode } from 'react'
import { createContext } from 'react'

type Episode = {
   title: string;
   members: string;
   thumbnail: string;
   duration: number;
   url: string;
}

type PlayerContextData = {
   episodeList: Episode[];
   currentEpisodeIndex: number;
   isPlaying: boolean;
   playList: (list: Episode[], index: number) => void; 
   play: (episode: Episode) => void;
   setPlayingState: (state: boolean) => void;
   togglePlay: () => void;
   playNext: () => void;
   playPrevious: () => void;
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextDataProviderProps = {
   children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextDataProviderProps) {
   const [episodeList, setEpisodeList] = React.useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
     setEpisodeList(list);
     setCurrentEpisodeIndex(index);
     setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function playNext() {
     const nextEpisodeIndex = currentEpisodeIndex + 1

     if(nextEpisodeIndex < episodeList.length) 
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
  }

  function playPrevious() {
     if(currentEpisodeIndex > 0)
         setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  }

  return (
    <PlayerContext.Provider 
      value={{ 
         episodeList, 
         currentEpisodeIndex, 
         play, 
         playList,
         playNext,
         playPrevious,
         isPlaying, 
         togglePlay, 
         setPlayingState,
      }}
   >
       {children}
    </PlayerContext.Provider>
  )
}