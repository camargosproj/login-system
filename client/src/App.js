import "./App.css";
import Login from "./components/Login/Login";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import ProtectRoute from "./components/protectRoute/ProtectRoute";
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';


function App() {

 return (
    <div className="App">
      <div className="container">        
        <Router>
          <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route path="/home" exact element={
              <ProtectRoute redirectpath="/">
                <Home/>
              </ProtectRoute>
            } /> 
            <Route path="/blog" exact element={
              <ProtectRoute redirectpath="/">
                <Blog/>
              </ProtectRoute>
            } /> 
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
