import "./App.css";
import Login from "./components/Login/Login";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import ProtectRoute from "./components/protectRoute/ProtectRoute";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

 return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route  exact element={<ProtectRoute redirectpath="/" />} >
                <Route path="/home" element={<Home/>} />
                <Route path="/blog" element={<Blog/>} />
            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
      </Router>
      </div>
  );
}

export default App;
