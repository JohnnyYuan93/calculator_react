import React, { useState, useRef, useEffect} from "react"; 
import "./App.css"; 
 
function App() { 
  const inputRef = useRef(null); 
  const resultRef = useRef(null); 
  const [result, setResult] = useState(0); 

  const [bill, setBill] = useState(""); 
  
  const [tip, setTip] = useState("0%"); 

  // useState hook for number of splits 
  const [split, setSplit] = useState(1); 

  const [splitTotal, setSplitTotal] = useState(0); 

  const [selectedButton, setSelectedButton] = useState(null);

  function handleTipButton(e) { 
    let value = e.target.innerHTML; 
    setTip(value); 
    if (selectedButton===e.target.innerHTML) {
      setSelectedButton(null);  // unselect the button
    } else{setSelectedButton(e.target.innerHTML);
      } 
  } 

  function handleBillChange(e) { 
      setBill(e.target.value); 
  } 

  function splitMinus() { 
      setSplit((oldValue) => Math.max(oldValue - 1, 1)); 
  } 

  function splitPlus() { 
      setSplit((oldValue) => oldValue + 1); 
  } 

  function calculate() { 
      const percentage = 1 + parseInt(tip.replace("%", "")) / 100; 
      const result = ((bill * percentage) / split).toFixed(2); 
      setSplitTotal(result); 
  } 

  // useEffect hook to calculate the split whenever bill, tip, or split changes 
  useEffect(() => { 
      calculate(); 
  }, [bill, tip, split]); 

  //
 
  function plus(e) { 
    e.preventDefault(); 
    setResult((result) => result + Number(inputRef.current.value)); 
  } 
 
  function minus(e) { 
    e.preventDefault(); 
    const inputVal = inputRef.current.value; 
    const newResult = result - Number(inputVal); 
    setResult(newResult); 
  } 
 
  function times(e) { 
    e.preventDefault(); 
    const inputVal = inputRef.current.value; 
    const newResult = result * Number(inputVal); 
    setResult(newResult); 
  } 
 
  function divide(e) { 
    e.preventDefault(); 
    const inputVal = inputRef.current.value; 
    const newResult = result / Number(inputVal); 
    setResult(newResult); 
  } 
 
  function resetInput(e) { 
    e.preventDefault(); 
    inputRef.current.value = 0; 
  } 
 
  function resetResult(e) { 
    e.preventDefault(); 
    setResult(0); 
  } 
 
  return (
    <div className="App"> 
    <div className="main">
      <h1>Tip Calculator</h1>
    <label>Bill total</label> 
      <input 
          type="text"
          placeholder={"0.00"} 
          value={bill} 
          onChange={handleBillChange} 
      /> 
  
      {/* Tip input */} 
      <label>Tip</label> 
      <div class="tip">
        <button className={selectedButton==="5%" ? 'selected' : 'not-selected'} onClick={handleTipButton}>5%</button>
        <button className={selectedButton==="10%" ? 'selected' : 'not-selected'} onClick={handleTipButton} >10%</button>
        <button className={selectedButton==="15%" ? 'selected' : 'not-selected'} onClick={handleTipButton}>15%</button>
        <button className={selectedButton==="20%" ? 'selected' : 'not-selected'} onClick={handleTipButton}>20%</button>
        <button className={selectedButton==="25%" ? 'selected' : 'not-selected'} onClick={handleTipButton}>25%</button>
        <button className={selectedButton==="30%" ? 'selected' : 'not-selected'} onClick={handleTipButton}>30%</button>
        <label>Custom</label>
        <input type="text" placeholder="0%"  onChange={(e) => setTip(e.target.value)} /> 
      </div>

      <div className="summary">
        <div className="split">
          <label>Split</label>
          <div className="split-controls">
              <button onClick={splitMinus}>-</button>
              <span>{split}</span>
              <button onClick={splitPlus}>+</button>
          </div>
        </div>
        <div className="result">
          <label>Split total</label>
          <span>{splitTotal}</span>
        </div>
      </div>

    </div>
      <div> 
        <h1>Simplest Working Calculator</h1> 
      </div> 
      <form> 
        <p ref={resultRef}>{result}</p> 
        <input 
          pattern="[0-9]" 
          ref={inputRef} 
          type="number" 
          placeholder="Type a number" 
        /> 
        <button onClick={plus}>add</button> 
        <button onClick={minus}>subtract</button> 
        <button onClick={times}>multiply</button> 
        <button onClick={divide}>divide</button> 
        <button onClick={resetInput}>reset input</button> 
        <button onClick={resetResult}>reset result</button> 
      </form> 
    </div> 
  ); 
} 
 
export default App;