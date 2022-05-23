import "./App.css";
import Login from "./components/Login/Login";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

 return (
    <div className="App">
      <div className="container">        
        <Router>
          <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route path="/home" exact element={<Home />} />
          </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
