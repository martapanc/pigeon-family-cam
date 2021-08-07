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
                    <img id="video" className={"video rotate-video-180"} alt={"Pigeon family cam"} src=""/>
                </div>

                <div className={"icon-section"}>
                    <img className={"icon"} src={pigeonFamily} alt={"pigeons"}/>
                </div>

                <footer>
                    <a href="https://mpancaldi.co.uk/" target="_blank" rel="noopener noreferrer">
                        <strong>Made by Marta P.</strong>
                    </a>
                </footer>
            </div>
        </div>
    );
}

export default App;

function loadVideoStream() {
    const url = "https://testphotos.teotaylor.co.uk:8081/stream/video.mjpeg";
    const SOI = new Uint8Array(2);
    SOI[0] = 0xFF;
    SOI[1] = 0xD8;
    const CONTENT_LENGTH = 'content-length';
    const TYPE_JPEG = 'image/jpeg';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status + ' ' + response.statusText)
            }

            if (!response.body) {
                throw Error('ReadableStream not yet supported in this browser.')
            }

            const reader = response.body.getReader();

            let headers = '';
            let contentLength = -1;
            let imageBuffer = null;
            let bytesRead = 0;

            let frames = 0;
            let runTime = 0;
            setInterval(() => {
                console.log("Fps: " + frames + " (" + ++runTime + "s)");
                frames = 0;
            }, 1000);

            const read = () => {
                reader.read().then(({done, value}) => {
                    if (done) {
                        // eslint-disable-next-line no-undef
                        controller.close();
                        return;
                    }

                    for (let index = 0; index < value.length; index++) {
                        if (value[index] === SOI[0] && value[index + 1] === SOI[1]) {
                            contentLength = getLength(headers);
                            imageBuffer = new Uint8Array(new ArrayBuffer(contentLength));
                        }
                        if (contentLength <= 0) {
                            headers += String.fromCharCode(value[index]);
                        } else if (bytesRead < contentLength) {
                            imageBuffer[bytesRead++] = value[index];
                        } else {
                            let blob = new Blob([imageBuffer], {type: TYPE_JPEG});
                            document.getElementById('video').src = URL.createObjectURL(blob);
                            frames++;
                            contentLength = 0;
                            bytesRead = 0;
                            headers = '';
                        }
                    }
                    read();
                }).catch(error => {
                    console.error(error);
                });
            }
            read();
        })
        .catch(error => {
            console.error(error);
        });

    const getLength = (headers) => {
        let contentLength = -1;
        headers.split('\n').forEach((header, _) => {
            const pair = header.split(':');
            if (pair[0].toLowerCase() === CONTENT_LENGTH) {
                contentLength = pair[1];
            }
        });
        return contentLength;
    };
}

loadVideoStream();