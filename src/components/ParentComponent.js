import React, { useState } from 'react';
import FontChanger from './FontChanger';

const App = () => {
  const [fontStyle, setFontStyle] = useState('Arial');
  const [fontSize, setFontSize] = useState('14px');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const textStyle = {
    fontFamily: fontStyle,
    fontSize: fontSize,
    color: textColor,
    backgroundColor: backgroundColor,
    padding: '10px',
    margin: '20px',
  };

  return (
    <div>
      <FontChanger
        setFontStyle={setFontStyle}
        setFontSize={setFontSize}
        setTextColor={setTextColor}
        setBackgroundColor={setBackgroundColor}
      />
      <div style={textStyle}>
        This is a preview text. Change my style!
      </div>
    </div>
  );
};

export default App;
