//import logo from './logo.svg';
//import './App.css';
import React ,{ useState, useEffect }from 'react';
import '/Users/juliavister/my-react-app/src/Custom.css';
import Footer from "/Users/juliavister/my-react-app/src/components/footer.js";

import WelcomePage from "/Users/juliavister/my-react-app/src/pages/WelcomePage";
import NoMatch from "/Users/juliavister/my-react-app/src/pages/NoPage";
import LoginPage from "/Users/juliavister/my-react-app/src/pages/LoginPage";
import RegistrationForm from './pages/UserRegistration';
import MapPage from './pages/MapPage';



function App() {
  const [history, setHistory] = useState(['welcome']); 
  const [currentPage, setCurrentPage] = useState('welcome');

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setHistory((prevHistory) => [...prevHistory, page]);
  };

  const handleBack = () => {
    const previousPage = history[history.length - 2];
    if (previousPage) {
      setCurrentPage(previousPage);
      setHistory((prevHistory) => prevHistory.slice(0, -1)); // Pop the last page from the history stack
    }
  };

  useEffect(() => {
    window.history.pushState(null, null, `/${currentPage}`);
  }, [currentPage]);

  return (
    <div>
      {currentPage !== 'welcome' && ( <button className="back-button" onClick={handleBack}>Back</button>)}
      {currentPage === 'welcome' && <WelcomePage handleNavigation={handleNavigation} />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'register' && <RegistrationForm />}
      {currentPage === 'map' && <MapPage />}
      {currentPage === '404' && <NoMatch />}

      <div
        style={{minHeight: "400px", color: "pink",}} >
      </div>
      <Footer />
    </div>
    
  );

}
export default App;
