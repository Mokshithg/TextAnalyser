import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Navbar from './components/Navbar.js';  
import Textform from './components/Textform';
import FontChanger from './components/FontChanger';

function App() {
  const [mode, setMode] = useState("dark mode");
  const [mystyle, setMystyle] = useState({
    color: 'black',
    backgroundColor: 'white'
  });

  const onclickfun2 = () => {
    if (mode === "dark mode") {
      setMode("light mode");
      setMystyle({ color: 'black', backgroundColor: 'white' }); // Light theme styles
    } else {
      setMode("dark mode");
      setMystyle({ color: 'white', backgroundColor: 'black' }); // Dark theme styles
    }
  };

  const [alert, setAlert] = useState({ msg: '', type: '' });

  const showalert = (message, type) => {
    setAlert({ msg: '', type: '' });
    setTimeout(() => {
      setAlert({ msg: message, type: type });
    }, 1000);
  };

  const [fontStyle, setFontStyle] = useState("Arial");
  const [fontSize, setFontSize] = useState("14px");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Navbar title="45" desc="Description is here..." mssg="Message is here" mode={mode} style={mystyle} />
          }>
            <Route index element={
              <Textform 
                alert={alert} 
                title="Analyse Your text here..." 
                mode={mode} 
                style={mystyle} 
                fontStyle={fontStyle} 
                fontSize={fontSize} 
                textColor={textColor} 
                backgroundColor={backgroundColor} 
              />
            } />
          </Route>
        </Routes>
        <div style={{ position: 'relative', height: '100vh', marginTop: '20px' }}>
          <FontChanger 
            setFontStyle={setFontStyle} 
            setFontSize={setFontSize} 
            setTextColor={setTextColor} 
            setBackgroundColor={setBackgroundColor}
          />
        </div>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
