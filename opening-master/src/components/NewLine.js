import React from "react";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from 'chess.js'

const TimeOut = ({setDisplayMenu}) => {
    setTimeout(() => {
        setDisplayMenu(true)
    }, 1000)
}

const NewLine = ({user, setDisplayMenu, width, height }) => {
    const square = width < height ? width : height
    const [chess, setChess] = useState(new Chess())
    const [fenList, setFenList] = useState([])

    useEffect (()=>{
        setChess(new Chess())
    },[])

    useEffect (()=> {
        setFenList([])
    },[])

    //CHESS LOGIC

    //Get exportable fen string from fenList
    const getFen = () => {
        const dict = {}
        for (let i = 0; i < fenList.length; i++){
            dict[fenList[i][0]] = fenList[i][1]
        }
        console.log(dict)
        return dict
    }

    //test to set board
    const getPos = () =>{
        let newChess = new Chess()
        newChess.loadPgn('1. e4 e5 2. Nf3 d5 3. exd5 Nf6 4. d6')
        setChess(newChess)
        setFenList([])
    }

    const onDrop = (from, to) => {
        let copy = new Chess()
        copy.loadPgn(chess.pgn())
        copy.move({from,to}) ? setChess(copy) : copy = false
        if(copy){
            const myFen = [...fenList]
            myFen.push([chess.pgn(), copy.pgn()])
            setFenList(myFen)
        }
        console.log(fenList)
        return copy
    }
    //CHESS LOGIC

    if (user == 'guest'){
        return (
            <div style={{height: square * 0.8 ,width: square * 0.8}}>
                <h2 style={{textAlign:'center', margin:'auto'}}>Please Login to save lines</h2>
                <TimeOut setDisplayMenu={setDisplayMenu}/>
            </div>
        )
    } else {
        return (
            <div>
            <Chessboard boardWidth={width < height ? width * 0.8: height * 0.8} onPieceDrop={onDrop} position={chess.fen()}/>
            <button onClick={getFen}>GET FEN</button>
            <button onClick={getPos}>GET POS</button>
            </div>
        )
    }
}

export default NewLine