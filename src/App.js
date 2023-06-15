import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import RouteList from './util/RouteList';

function App() {
  return (
    <Router>
      <RouteList />
    </Router>
  );
}

export default App;
