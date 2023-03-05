import React from 'react';
// import SearchBar from './SearchBar';
// import Roadmap from './Roadmap';
import LandingPage from './Pages/LandingPage';
import ResultsPage from './Pages/ResultsPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import SearchPage from './Pages/SearchPage';
// import Test from './test';
import Navbar from './Components/Navbar';
import Roadmap from './Components/Roadmap';
import './css/App.css';

// import react-dom-router
import { Route, Routes } from "react-router-dom";


const App = () => {
  return (
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/results" element={<Roadmap />} />
            <Route path="/search" element={<SearchPage />} />
            {/* <Route path="/test" element={<Test />} /> */}
            <Route path="/navbar" element={<Navbar />} />
          </Routes>
        </div>

  );
}

export default App;
