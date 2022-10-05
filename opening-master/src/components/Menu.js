import React from "react"
import { Button, Typography } from "@mui/material"

const OpeningMasterMenu = ({displayMenu, h, w, modeHandler}) => {
  const square = h > w ? w : h

  const getHelp = () => {
    window.open('http://google.com', '_blank')
  }

  if (displayMenu) {
    return (
      <div className="OpeningMasterMenu" style={{height: square * 0.8, width: square * 0.8}}>
        <ul style={{width: '100%'}}>
          <li><Button className="buttonGroup" variant="contained"value='play' onClick={modeHandler}>Play</Button></li>
          <li><Button className="buttonGroup" variant="contained"value='random' onClick={modeHandler}>Random</Button></li>
          <li><Button className="buttonGroup" variant="contained"value='new line' onClick={modeHandler}>New Line</Button></li>
          <li><Button className="buttonGroup" variant="contained"value='edit' onClick={modeHandler}>Edit</Button></li>
          <li><Button className="buttonGroup" variant="contained"value='help' onClick={getHelp}>Help</Button></li>
        </ul>
      </div>
    )
  }
}

export default OpeningMasterMenu