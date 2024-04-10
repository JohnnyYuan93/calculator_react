import React, { useState, useRef, useEffect} from "react"; 
import "./App.css"; 
 
function App() { 
  const inputRef = useRef(null); 
  const resultRef = useRef(null); 
  const [result, setResult] = useState(0); 

  const [bill, setBill] = useState(""); 
  
  // State for storing tip percentage 
  const [tip, setTip] = useState("10%"); 

  // State for storing number of splits 
  const [split, setSplit] = useState(1); 

  // State for storing split total 
  const [splitTotal, setSplitTotal] = useState(0); 

  // Function to handle changes in the tip input 
  function handleTipChange(e) { 
      let value = e.target.value.replace("%", ""); 
      if (value.indexOf("%") === -1) { 
          value = value + "%"; 
      } 
      setTip(value); 
  } 

  // Function to handle changes in the bill total input 
  function handleBillChange(e) { 
      setBill(e.target.value); 
  } 

  // Function to decrease the number of splits by 1 
  function splitMinus() { 
      setSplit((oldValue) => Math.max(oldValue - 1, 1)); 
  } 

  // Function to increase the number of splits by 1 
  function splitPlus() { 
      setSplit((oldValue) => oldValue + 1); 
  } 

  // Function to calculate the split total. based on bill, tip, and number of splits 
  function calculate() { 
      const percentage = 1 + parseInt(tip.replace("%", "")) / 100; 
      const result = ((bill * percentage) / split).toFixed(2); 
      setSplitTotal(result); 
  } 

  // useEffect hook to calculate the split total whenever bill, tip, or split changes 
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
      {/* Bill input */}
    <label>Bill total</label> 
      <input 
          type="text"
          placeholder={"0.00"} 
          value={bill} 
          onChange={handleBillChange} 
      /> 
  
      {/* Tip input */} 
      <label>Tip</label> 
      <input 
          type="text"
          placeholder={"10%"} 
          value={tip} 
          onChange={handleTipChange}
      />
      <div className="summary">
        <div className="split">
          <label>Split</label>
          <div className="split-controls">
              <button onClick={splitMinus}>-</button>
              <span>{split}</span>
              <button onClick={splitPlus}>+</button>
          </div>
          <div className="result">
            <label>Split total</label>
            <span>{splitTotal}</span>
          </div>
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