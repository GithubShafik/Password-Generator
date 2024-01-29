import "./App.css";
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(6); //default length
  const [numberAllowed, setNumberAllowed] = useState(false); //check box for numbers
  const [charAllowed, setCharAllowed] = useState(false); //check box for char
  const [password, setPassword] = useState("");//sore a value

  // useCallback(fun,[dependencies])
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);//dependencies

  //useEffect
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  //useRef
  const passwordRef = useRef(null);

  const copyPassToClipbord = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);


  return (
    <div className="box1 col-8 col-sm4  mx-auto main d-flex flex-column text-light p-2">
      <h1>Password Generator</h1>
      <div className="box2 col-sm4 col-6 d-flex p-2 m-auto ">
        <input
          type="text"
          class="form-control rounded-start col-6 col-sm4 text-center"
          value={password}//value came from passwor
          ref={passwordRef}//useRef
        />
      </div>
      <div>
        <button class="btn btn-primary my-2" onClick={copyPassToClipbord}>Copy</button>
      </div>

      <div>

        <input
          type="range"
          min={4}
          max={10}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);//set length
          }}
        />
        <label className="mx-2 ">Range: {length}</label>
      </div>

      <div className="box4 d-flex ">
        {/* 1 */}
        <div className="checkbox1 m-auto d-flex checkbox my-2">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>

          {/* 2 */}
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
