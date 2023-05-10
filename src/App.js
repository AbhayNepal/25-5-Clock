import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const[PPState , setPPstate] = useState('Pause')
  const [currSession, setCurrSession] = useState('Focus')
  const [sessionMode,setsessionMode] = useState(false);
  const [breakLength , setbreakLength] = useState(5);
  const[sessionLength, setsessionLength] = useState(25);
  const[sessionMinute, setsessionMinute] = useState(25)
  const[sessionSecond, setsessionSecond] = useState(0)

  const SessiondecrHandler = ()=>{
   if(sessionLength>1){ setsessionLength(sessionLength -1 )
    setsessionMinute(sessionLength -1)  
  }
  };
  const SessionIncrHandler = ()=>{
   if(sessionLength<60){ setsessionLength(parseInt(sessionLength) + 1 )
    setsessionMinute(parseInt(sessionLength) + 1 )
  }
  };
  const playHandler = () => {
    setsessionMode(true)
    if (sessionMode) {
      setsessionSecond(59);
    }
  };
const breakIncHandler = () =>{
  setbreakLength(breakLength + 1)
};
const breakDecrHandler = () =>{
  if(breakLength>1){
    setbreakLength(breakLength - 1)
  }
}
const resetHandler = ()=>{
  setsessionMinute(sessionLength)
  setsessionSecond(0)
  setsessionMode(false)
  setPPstate('Pause')
}
const pauseHandler = ()=>{

   if(PPState == 'Pause'){ 
  setsessionMode(false)
  setPPstate('Resume')
  
}
else{
  setsessionMode(true)
  setPPstate('Pause')
  setsessionSecond(sessionSecond)
}}

 


  useEffect(() => {
    if(sessionMode){let intervalId;
      if(currSession == 'Focus' ){
        setsessionMinute(sessionLength - 1 )
      }
      else{
        setsessionMinute(breakLength - 1 ) 
      }
    if (sessionSecond > 0 || sessionMinute >0) {
      intervalId = setInterval(() => {
        setsessionSecond(prevSecond => prevSecond - 1);
        if(sessionSecond == 0 ){
          setsessionMinute(sessionMinute -1)
          setsessionSecond(59)
          
        }
      }, 1000);
    }
    if(currSession == 'Focus' && sessionMinute == 0 && sessionSecond == 0){
      setCurrSession('Break')
      setsessionSecond(59)
    }
    if(currSession == 'Break' && sessionMinute==0 && sessionSecond == 0){
      setCurrSession('Focus')
      setsessionSecond(59)
    }
    return () => clearInterval(intervalId);

    
  }// Cleanup the interval on component unmount or when sessionSecond changes to 0
  }, [sessionSecond,sessionMode]);
  
  return (
    <div className="App">
      <div id="break-label">
       <h2>BREAK LENGTH</h2>
       <br />
       <div className='row'>
        <div className='col-sm'><button id="break-decrement" className='btn btn-info' onClick={breakDecrHandler}>-</button></div>
       <div className="col-sm"><h2 id='break-value'>{breakLength}</h2></div>
       <br /><br /><br /><br /><br />
       <div className="col-sm"> <button id="break-increment" className='btn btn-info' onClick={breakIncHandler}>+</button></div>
        </div>
      </div>
      <div id="session-label">
        <h2>SESSION LENGTH</h2>
        <br />
       <div className='row'>
        <div className='col-sm'><button id="session-decrement" className='btn btn-info' onClick={SessiondecrHandler}>-</button></div>
       <div className="col-sm" id='session-value'><h2>{sessionLength}</h2></div>
       <br /><br /><br /><br /><br />
       <div className="col-sm"> <button id="session-increment" className='btn btn-info' onClick={SessionIncrHandler}>+</button></div>
        </div>

        <div className='row'>
          <h2>SESSION({currSession})</h2>
          <br /><br />
          <div className="session btn btn-danger col-sm-4" id='sessionTime'><h1>{sessionMinute}:{sessionSecond.toString().padStart(2,'0')}</h1></div>

          <div>
            <br /> <br />
            <button className=' btn btn-info col-sm-1 buttons' id='btn-pause' onClick={pauseHandler}>{PPState}</button>
            <button className="btn btn-danger col-sm-5 buttons" id='btn-play' onClick={playHandler}>play</button>
            <button className='btn btn-info col-sm-1 buttons' id='btn-reset' onClick={resetHandler}> Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
