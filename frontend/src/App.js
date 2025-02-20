import logo from './logo.svg';
import './App.css';
import Formpage from './components/form/formpage.js';
import { BrowserRouter as Router , Routes, Route, useNavigate} from 'react-router-dom';
import { Dashboard } from './components/dashboard/dashboard';
import { Navbar } from './components/navbar/navbar';
import { Login } from './components/login/login';
import { Main } from './main.js';
import { Trunkboard } from './components/trunkboard/trunkboard.js';
import { Notfound } from './components/notfound/notfound.js';
import { Reset } from './components/reset/reset.js';
import { Footer } from './components/footer/footer.js';
import { Formmain } from './components/form/formmain.js';
import { Provider } from 'react-redux';
import store from './store/index.js';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
            <Navbar />
              <Main/>
                <Routes>
                  <Route path="/" element={<Formpage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/trunk" element={<Trunkboard />} />
                  <Route path="/login" element={<Formmain />} />
                  <Route path="/form/reset" element={<Reset />} />
                  <Route path="*" element={<Notfound />} />
                </Routes>
            <Footer/>
        </Router>
      </Provider>
     
    </div>
  );
}

export default App;
