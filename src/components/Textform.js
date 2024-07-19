import React, { useState } from 'react';

export default function Textform(props) {
    const [text, setTexts] = useState('Enter the text here ');

    const handleonchange = (event) => {
        setTexts(event.target.value);
    };

    const onclickfun = () => {
        let txt = text.toUpperCase();
        setTexts(txt);
    };
    
    const onclickfun2 = () => {
        let txt2 = text.toLowerCase();
        setTexts(txt2);
    };

    const textStyle = {
        fontFamily: props.fontStyle || 'Arial',
        fontSize: props.fontSize || '16px',
        color: props.textColor || 'black',
        backgroundColor: props.backgroundColor || 'white',
        borderRadius: '20px',
        padding: '22px',
        width: '100%',
        height: '200px',
    };

    return (
        <>
            <div style={{ height: '50px' }}>
                {props.alert && 
                    <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                        <strong>{props.alert.msg}</strong>
                    </div>
                }
            </div>

            <div className="container" style={props.style}>
                <h2>{props.title}</h2>
                <div className="mb-3" style={props.style}>
                    <textarea 
                        className="form-control" 
                        value={text} 
                        onChange={handleonchange} 
                        style={textStyle} 
                        id="mybox" 
                        rows="8"
                    ></textarea>
                </div>
                <button className="btn btn-success my-1" disabled={text.length === 0} onClick={onclickfun}>
                    Upper Case
                </button>
                <button className="btn btn-success my-1" onClick={onclickfun2} style={{marginLeft : 8}}>
                    Lower Case
                </button>
            </div>

            <div className="container my-3" style={props.style}>
                <h2>Summary of your text</h2>
                <p>{text.split(/\s+/).filter((element) => element.length !== 0).length} words and {text.length} characters</p>
            </div>
        </>
    );
}
