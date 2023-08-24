import React, {useState} from 'react';
import './App.css';

//import HelloWorld from "../HelloWorld/HelloWorld";
function App() {
    const [input, setInput] = useState({
        lastName: "",
        firstName: ""
    })

    const handleChangeInput = (key, value) => {
        setInput(prevInput => {
            return {
                ...prevInput,
                [key]: value
            }
        })
    }

    return (
        <div>
            <input
                value={input.firstName}
                onChange={event => {
                    handleChangeInput("firstName", event.target.value)
                }}
            />
            <input
                value={input.lastName}
                onChange={event => {
                    handleChangeInput("lastName", event.target.value)
                }}
            />
            <button onClick={() => alert(JSON.stringify(input))}>
                Click me
            </button>
        </div>
    );
}

export default App;
