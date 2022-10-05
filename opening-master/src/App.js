import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import * as React from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google'
import NewLine from './components/NewLine'
import ButtonAppBar from './components/ButtonAppBar';
import { Chessboard } from 'react-chessboard'
import { useState, useEffect } from 'react';
import OpeningMasterMenu from './components/Menu';
import { Chess } from 'chess.js'

const PlayMode = ({ mode, displayMenu, width, height, user, setDisplayMenu }) => {
  if (mode === 'new line' && displayMenu === false){
    return (
      <NewLine mode={mode} displayMenu={displayMenu} width={width} height={height} user={user} setDisplayMenu={setDisplayMenu}/>
    )
  } else {
    return (
      <Chessboard boardWidth={width < height ? width * 0.8: height * 0.8}/>
    )
  }
}

const App = () => {
  const [width, setWidth] = useState(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
  const [height, setHeight] = useState(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
  const [mode, setMode] = useState('default')
  const [displayMenu, setDisplayMenu] = useState(true)
  const [chess, setChess] =useState(new Chess())
  const [user, setUser] = useState('')

  useEffect(()=>{
    setUser('guest')
  },[])

  const resizeHandler = () => {
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    setWidth(w)
    setHeight(h)
  }

  const modeHandler = (event) => {
    event.preventDefault()
    setMode(event.target.value)
    setDisplayMenu(false)
  }

  useEffect(()=>{
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <GoogleOAuthProvider clientId='720674888113-prj4llvboojk0ldt15dievrdpgfntlvr.apps.googleusercontent.com'>
    <div className='MainPage'>
      <ButtonAppBar
        className='TopBar'
        displayMenu={displayMenu}
        setDisplayMenu={setDisplayMenu}
        setMode={setMode}
        setUser={setUser}
        user = {user}
      />
      <div className='TheBoard'>
        <OpeningMasterMenu displayMenu={displayMenu} h={height} w={width} modeHandler={modeHandler}/>
        <PlayMode mode={mode} height={height} width={width} displayMenu={displayMenu} user={user} setDisplayMenu={setDisplayMenu} />
      </div>
      <div>{mode}</div>
    </div>
    </GoogleOAuthProvider>
  )
}
export default App;
