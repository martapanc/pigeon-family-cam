import React from 'react';
import './App.css';
import pigeonFamily from './assets/pigeon_family.png';
import $ from "jquery";
import html2canvas from "html2canvas";
import FileSaver from 'file-saver';

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
                    <img id="video" className={"video rotate-video-180"} src="https://testphotos.teotaylor.co.uk:8081/stream/video.mjpeg"
                         alt={"pigeon family cam"}/>
                    <input type="button" id="btnSave" value="Save PNG"/>
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

setInterval(function() {
    const video = document.getElementById('video');

    // @ts-ignore
    video.src = 'https://testphotos.teotaylor.co.uk:8081/stream/video.mjpeg'
}, 6000);

setInterval(function () {
    window.location.reload();
}, 30000)

function saveScreenshot() {
    // const canvas = document.getElementById('video') as HTMLCanvasElement;
    // const context = canvas.getContext('2d');

    // @ts-ignore
    let target = $('#video').toDataURL();
    window.open('', target);
}

$(function() {
    $("#btnSave").click(function() {
        // @ts-ignore
        html2canvas($("#widget"), {
            onrendered: function(canvas: { toBlob: (arg0: (blob: any) => void) => void; }) {
                canvas.toBlob(function(blob) {
                    FileSaver.saveAs(blob, "Dashboard.png");
                });
            }
        });
    });
});