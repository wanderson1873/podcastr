import React from 'react'

import '../style/global.scss'
import { Header } from '../components/Header'
import { Player } from '../components/Player'

import styles from '../style/app.module.scss'
import { PlayerContextProvider } from '../contexts/PlayerContext'

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>  
  )
}

export default MyApp
