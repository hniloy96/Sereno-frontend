import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home-page';
import Feed from './Pages/Feed-page';
import SIGNUP from './Pages/Sign-upAuth';
import Detailpost from './Pages/Post-detail'
import Updatepost from './Pages/Post-update'
import LOGIN from './Pages/Log-inAuth';
import Album from './Pages/Album-detail'

import { UserContext } from './data';
import { useState } from 'react'
console.log(UserContext)

function App() {
    const { Provider : UserInfo } = UserContext

    const [ isAuthenticated, setIsAuthenticated] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

  return (
    <div className='App'>
      <UserInfo value={{
        isAuthenticated, 
        currentUser,
        setAuth: setIsAuthenticated,
        setUser: setCurrentUser
      }}>
      <div className="page">
         <Routes>
         <Route path="/" element={<LOGIN />} />
          <Route path='/signup' element={ < SIGNUP />} />
          <Route path='/home' element={< Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path='/post/:id' element={<Detailpost />} />
          <Route path='/post-update/:id' element= {< Updatepost />} />
          <Route path='/album/:id' element= {< Album />} />
        </Routes>
      </div>
      </UserInfo>
    </div>
    
  );
}

export default App;
