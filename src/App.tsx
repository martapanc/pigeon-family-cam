import React from 'react';
import './App.css';
import pigeonFamily from './assets/pigeon_family.png';

function App() {
    return (
        <div className="App">
            <div className={"main"}>
                <div className={"header"}>
                    <h1>
                        <span className={"mobile-hide"}>🐦&nbsp;</span>
                        &nbsp;Pigeon Family Cam
                        <span className={"mobile-hide"}>&nbsp;🐦</span>
                    </h1>
                </div>

                <div className={"video-section"}>
                    <img className={"video"} src="https://testphotos.teotaylor.co.uk:8081/stream/video.mjpeg"
                         alt={"pigeon family cam"}/>
                </div>

                <div className={"icon-section"}>
                    <img className={"icon"} src={pigeonFamily} alt={"pigeons"}/>
                </div>

                <footer>
                    <a href="https://mpancaldi.co.uk/" target="_blank" rel="noopener noreferrer"><strong>Made by Marta
                        P.</strong></a>
                </footer>
            </div>
        </div>
    );
}

export default App;
