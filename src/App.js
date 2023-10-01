import './index.css'
import { useEffect, useState } from 'react';

function App() {
  const [input, setInput] = useState(0)
  const [fromcurr, setFromCurr] = useState("USD")
  const [tocurr, setToCurr] = useState("CAD")
  const [res, setRes] = useState("")


  useEffect(
    function(){

      async function convert(){
        try {

          const res = await fetch(`https://api.frankfurter.app/latest?amount=${input}&from=${fromcurr}to=${tocurr}`)
    
          const data = await res.json()
          console.log(data.rates)
          if(!res.ok) throw new Error('something went wrong with fetching data')
          setRes(data.rates.tocurr)
        } catch(error){
            console.log(error)
        }finally{
          console.log('hello')
        }
      }
      convert()
      // return function(){
      //   setRes(data.rates.tocurr)
      // }
    }, [input, fromcurr, tocurr]
  )

  return (
    <div>
      <InputText Input={input} SetInput={setInput}/>
      <FromSelector Fromcurr={fromcurr} SetFromCurr={setFromCurr}/>
      <ToSelector ToCurr={tocurr} SetToCurr={setToCurr}/>
      <p>Converted Amount : {res} - Converted Currency {tocurr}</p>
    </div>
  );
}

function InputText({ Input, SetInput }){
  return (
    <input type="text" value={Input} onChange={(e)=>SetInput(e.target.value)}/>
  )
}

function FromSelector({ Fromcurr, SetFromCurr }){
  return (
    <select value={Fromcurr} onChange={(e)=>SetFromCurr(JSON.stringify(e.target.value))}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
    </select>
  ); 
}

function ToSelector({ ToCurr, SetToCurr}){
  return (
    <select value={ToCurr} onChange={(e)=>SetToCurr(JSON.stringify(e.target.value))}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
    </select>
  );
}

export default App;
