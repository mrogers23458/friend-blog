import Home from './pages/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom'
import Topnav
 from './components/Topnav';
import Comments from './components/Comments';
function App() {
  
  return (
    <div className="App">
      <Topnav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/comments/:id" element={<Comments />} />
      </Routes>
    </div>
  );
}

export default App;
