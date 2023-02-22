import React from 'react';
// import SearchBar from './SearchBar';
// import Roadmap from './Roadmap';
import LandingPage from './LandingPage';
import ResultsPage from './ResultsPage';
import Signup from './Signup';
import Login from './Login';
import SearchBar from './SearchBar';
import Test from './test';
// import react-dom-router
import { Route, Routes } from "react-router-dom";


const App = () => {
  return (
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/search" element={<SearchBar />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </div>

  );
}

export default App;
