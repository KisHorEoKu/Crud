import logo from './logo.svg';
import './App.css';
import Formpage from './components/form/formpage.js';
import { BrowserRouter as Router , Routes, Route, useNavigate} from 'react-router-dom';
import { Dashboard } from './components/dashboard/dashboard';
import { Navbar } from './components/navbar/navbar';
import { Login } from './components/login/login';
import { Main } from './main.js';
import { Trunkboard } from './components/trunkboard/trunkboard.js';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Main/>
        <Routes>
          <Route path="/" element={<Formpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trunk" element={<Trunkboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
