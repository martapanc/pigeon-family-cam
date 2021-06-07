import React, {CSSProperties} from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className={"main"}>
                <h1>🐦 Pigeon Family Cam 🐦</h1>
                <img src="http://testphotos.teotaylor.co.uk:8081/" alt={"pigeon family cam"}/>
            </div>
            <footer>
                <a href="https://mpancaldi.co.uk/">Made by Marta P.</a>
            </footer>
        </div>
    );
}

export default App;
