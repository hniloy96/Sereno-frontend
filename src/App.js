import './App.css';
import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import Home from './Pages/Home-page';
import Profile from './Pages/Profile-page';
import Feed from './Pages/Feed-page'
import SIGNUP from './Pages/Signup-page'
import LOGIN from './Pages/Login-page'
import Nav from './Components/Nav';

function App() {
  return (
    <div className='App'>
      <div className="page">
         <Routes>
          <Route path='/signup' element={ < SIGNUP />} />
          <Route path='/login' element={ < LOGIN />} />
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      

      </div>
    </div>
    
  );
}

export default App;
