import logo from './logo.svg';
import './App.css';
import './bootstrapcss/bootstrap.css';

function App() {
  return (
      <div className="App">
        <nav class="navbar navbar-expand-lg bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">Unfinite</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Contribute</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">About</a>
            </li>
          </ul>
          </div>
        </div>
        </nav>
        <div className='landing'>
          <div class='container'>
            <h1 class="display-4">Learn something today!</h1>
            <form class="form-inline my-2 my-lg-0">
              <nav class="navbar navbar-expand-lg bg-light">
                <input class="form-control mr-sm-2" type="search" placeholder="Search Pathways" aria-label="Search" />
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search!</button>
              </nav>
            </form>
          </div>
        </div>
      </div>
  );
}

export default App;
