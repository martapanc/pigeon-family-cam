import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className={"main"}>
                <h1>
                    <span className={"mobile-hide"}>🐦&nbsp;</span>
                    &nbsp;Pigeon Family Cam
                    <span className={"mobile-hide"}>&nbsp;🐦</span>
                </h1>
                <div className={"video-section"}>
                    <img className={"video"} src="http://testphotos.teotaylor.co.uk:8081/" alt={"pigeon family cam"}/>
                </div>
            </div>
            <footer>
                <a href="https://mpancaldi.co.uk/">Made by Marta P.</a>
            </footer>
        </div>
    );
}

export default App;
