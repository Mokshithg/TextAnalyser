import React, { useState, useRef } from 'react';

const FontChanger = ({ setFontStyle, setFontSize, setTextColor, setBackgroundColor }) => {
  const fontStyles = [
    { name: 'Arial', value: 'Arial' },
    { name: 'Times New Roman', value: 'Times New Roman' },
    { name: 'Courier', value: 'Courier' }
  ];

  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Green', value: '#008000' },
    { name: 'Blue', value: '#0000FF' }
  ];

  const backgroundColors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'LightGray', value: '#D3D3D3' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'LightBlue', value: '#ADD8E6' }
  ];

  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentFontSize, setCurrentFontSize] = useState(14); // Default font size
  const historyRef = useRef([]);

  const handleFontChange = (type, event) => {
    const newValue = event.target.value;
    const lastState = historyRef.current[historyRef.current.length - 1] || { fontStyle: '', fontSize: '', textColor: '', backgroundColor: '' };

    if (type === 'style') {
      setFontStyle(newValue);
      historyRef.current.push({ ...lastState, fontStyle: newValue });
    } else if (type === 'color') {
      setTextColor(newValue);
      historyRef.current.push({ ...lastState, textColor: newValue });
    } else if (type === 'backgroundColor') {
      setBackgroundColor(newValue);
      historyRef.current.push({ ...lastState, backgroundColor: newValue });
    }

    setHistory([...historyRef.current]);
    setRedoStack([]);
  };

  const handleFontSizeChange = (event) => {
    let newSize = parseInt(event.target.value);
    if (isNaN(newSize) || newSize < 1) newSize = 1; // Prevent font size from being less than 1
    setCurrentFontSize(newSize);
    setFontSize(newSize + 'px');
  };

  const handleUndo = () => {
    if (historyRef.current.length === 0) return;

    const lastState = historyRef.current.pop();
    setRedoStack([lastState, ...redoStack]);
    const newState = historyRef.current[historyRef.current.length - 1] || { fontStyle: '', fontSize: '', textColor: '', backgroundColor: '' };

    setFontStyle(newState.fontStyle);
    setFontSize(newState.fontSize);
    setTextColor(newState.textColor);
    setBackgroundColor(newState.backgroundColor);
    setHistory([...historyRef.current]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const nextState = redoStack.shift();
    historyRef.current.push(nextState);

    setFontStyle(nextState.fontStyle);
    setFontSize(nextState.fontSize);
    setTextColor(nextState.textColor);
    setBackgroundColor(nextState.backgroundColor);
    setHistory([...historyRef.current]);
    setRedoStack([...redoStack]);
  };

  return (
    <div className="flex flex-col justify-center gap-4 mt-4" style={{ display: 'flex', marginLeft: 200 }}>
      <div className="flex gap-4">
        <select
          className="border border-gray-300 rounded-lg p-2"
          onChange={(event) => handleFontChange('style', event)}
        >
          <option value="">Select Font Style</option>
          {fontStyles.map((style, index) => (
            <option key={index} value={style.value}>{style.name}</option>
          ))}
        </select>

        <input
          type="number"
          className="border border-gray-300 rounded-lg p-2"
          value={currentFontSize}
          onChange={handleFontSizeChange}
          style={{ marginLeft: 8 }}
          min="1" 
        />

        <select
          className="border border-gray-300 rounded-lg p-2"
          onChange={(event) => handleFontChange('color', event)}
          style={{ marginLeft: 8 }}
        >
          <option value="">Select Text Color</option>
          {colors.map((color, index) => (
            <option key={index} value={color.value}>{color.name}</option>
          ))}
        </select>
        <select
          className="border border-gray-300 rounded-lg p-2"
          onChange={(event) => handleFontChange('backgroundColor', event)}
          style={{ marginLeft: 8 }}
        >
          <option value="">Select Background Color</option>
          {backgroundColors.map((color, index) => (
            <option key={index} value={color.value}>{color.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-4 mt-12">
        <button
          className="border border-gray-300 rounded-lg p-2"
          onClick={handleUndo}
          disabled={historyRef.current.length === 0}
          style={{marginLeft : 8}}
        >
          Undo
        </button>
        <button
          className="border border-gray-300 rounded-lg p-2"
          onClick={handleRedo}
          disabled={redoStack.length === 0}
          style={{marginLeft : 8}}
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default FontChanger;
