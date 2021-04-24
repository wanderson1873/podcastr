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
   isLooping: boolean;
   isShuffling: boolean;
   playList: (list: Episode[], index: number) => void; 
   play: (episode: Episode) => void;
   setPlayingState: (state: boolean) => void;
   cleanPlayerState: () => void;
   togglePlay: () => void;
   toggleLoop: () => void;
   toggleShuffle: () => void;
   playNext: () => void;
   playPrevious: () => void;
   hasNext: boolean;
   hasPrevious: boolean;
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextDataProviderProps = {
   children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextDataProviderProps) {
  const [episodeList, setEpisodeList] = React.useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLooping, setIsLooping] = React.useState(false);
  const [isShuffling, setIsShuffling] = React.useState(false);

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

  function toggleLoop() {
   setIsLooping(!isLooping);
  }

  function toggleShuffle() {
   setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function cleanPlayerState() {
     setEpisodeList([]);
     setCurrentEpisodeIndex(0);
  }

  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;
  
  function playNext() {
     if(isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
     } else if(hasNext) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
     }
  }

  function playPrevious() {
     if(hasPrevious)
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
         isLooping,
         isShuffling,
         togglePlay, 
         toggleLoop,
         toggleShuffle,
         setPlayingState,
         cleanPlayerState,
         hasNext,
         hasPrevious,
      }}
   >
       {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
   return React.useContext(PlayerContext);
}