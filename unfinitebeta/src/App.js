import React from 'react';
import SearchBar from './SearchBar';
import Roadmap from './Roadmap';
import LandingPage from './LandingPage';
import ResultsPage from './ResultsPage';
import Signup from './Signup';
import Login from './Login';
// import react-dom-router
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const App = () => {
  return (
      <div className="App">
        {/* <Login /> */}
        {/* <Signup /> */}
        {/* <ResultsPage /> */}
        <LandingPage />
        {/* <SearchBar /> */}
        {/* Add other components here */}
        {/* <Roadmap /> */}
      </div>
  );
}

export default App;
// const App = () => {

//   return (
//     <div className="App">
//       <SearchBar />
//       {/* Add other components here */}
//       {/* <Roadmap /> */}
//     </div>
//   );
// }

// export default App;
