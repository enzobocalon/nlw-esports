import './styles/main.css'
import logo from './assets/logo.svg'
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import GameBanner from './components/GameBanner'
import CreateAdBanner from './components/CreateAdBanner'
import { GameController } from 'phosphor-react'
import Input from './components/Form/input'
import CreateAdModal from './components/CreateAdModal'
import axios from 'axios'

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ad: number;
  }
}


function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(res => {
      setGames(res.data)
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logo} className='h-40 w-full' />

      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlwGradient bg-clip-text'>duo</span> está aqui.</h1>
    
      <div className='grid grid-cols-6 gap-6 mt-16'>
      {
        games.map(game => {
          return (
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title = {game.title} adsCount = {game._count.Ad} />
          )
        })
      }

      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
