import NavBar from './components/NavBar';
import About from './components/About';
import Profile from './components/Profile';
import HomePage from './components/HomePage';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  let darkBg = "#202124";
  const [darkMode, setDarkMode] = useState(null);
  const [curStyle, setCurStyle] = useState({
    color: "black",
    backgroundColor: "white",
    mode: "light",
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "white" : darkBg;
    if (!darkMode) {
      setCurStyle({
        color: "white",
        mode: "dark"
      })
    } else {
      setCurStyle({
        color: "black",
        backgroundColor: "white",
        mode: "light"
      })
    }
  };
  return (
    <>
      <Router>
        <NavBar title="Pandemos" darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route exact path="/about" element={<About curStyle={curStyle} />} />
          <Route exact path="/profile" element={<Profile curStyle={curStyle} />} />
          <Route exact path="/" element={<HomePage curStyle={curStyle} />} />
        </Routes>
      </Router>

    </>

  );
}

export default App;
