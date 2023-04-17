import React from 'react';
// import SearchBar from './SearchBar';
// import Roadmap from './Roadmap';
import LandingPage from './Pages/LandingPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Test from './Pages/test';
import './css/App.css';
import PDFSearch from './Pages/PDFSearch';
import Premium from './Pages/Premium';

// import react-dom-router
import { Route, Routes } from "react-router-dom";


const App = () => {
  return (
        <div className="App">
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<PDFSearch />} />
            <Route path="/premium" element={<Premium />} />
          </Routes>
        </div>

  );
}

export default App;
