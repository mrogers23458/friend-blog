import Home from './pages/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'
import Topnav
 from './components/Topnav';
import Comments from './components/Comments';
import Createapost from './pages/Createapost';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  
  return (
    <div className="App">
      <Topnav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Createapost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/comments/:id" element={<Comments />} />
      </Routes>
    </div>
  )
}

export default App;
