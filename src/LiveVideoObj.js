import React, { useState } from 'react';
import './LiveVideoObj.css';




const LiveVideoObj = () => {

    let myLiveVideoDiv = document.getElementById('myLiveVideoDIV');
    // myLiveVideoDiv.id = "myVid";
    let video = document.getElementById('video');
    let selectedLiveVideoID = myLiveVideoDiv.id;

    let videoCanvas = document.getElementById('videoCanvas');
    let mainCanvas = document.getElementById('mainCanvas');
    let drawCanvas = document.getElementById('drawCanvas');
    let eraseCanvas = document.getElementById('eraseCanvas');
    let textCanvas = document.getElementById('textCanvas');
    let tempMediaCanvas = document.getElementById('tempMediaCanvas');
    let mediaCanvas = document.getElementById('mediaCanvas');

    var videoCTX = videoCanvas.getContext('2d');
    var mainCTX = mainCanvas.getContext('2d');
    let drawCTX = drawCanvas.getContext('2d');
    let eraseCTX = eraseCanvas.getContext('2d');
    let textCTX = textCanvas.getContext('2d');
    let tempMediaCTX = tempMediaCanvas.getContext('2d');
    let mediaCTX = mediaCanvas.getContext('2d');

    let mediaMessage = document.getElementById('mediaMessage');


    function test() {
        // var $this = this; //cache
        var $this = video
        // console.log('new video playing: ' + liveVideoCount);
        (function loop() {
            if (!$this.paused && !$this.ended) {
                videoCTX.drawImage($this, 0, 0);
                setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();

        video.videoWidth = 320;
        video.videoHeight = 240;
        mainCanvas.width = video.videoWidth;
        mainCanvas.height = video.videoHeight;
        drawCanvas.width = video.videoWidth;
        drawCanvas.height = video.videoHeight;
        eraseCanvas.width = video.videoWidth;
        eraseCanvas.height = video.videoHeight;
        textCanvas.width = video.videoWidth;
        textCanvas.height = video.videoHeight;
        videoCanvas.width = video.videoWidth;
        videoCanvas.height = video.videoHeight;
        mediaCanvas.width = video.videoWidth;
        mediaCanvas.height = video.videoHeight;
        tempMediaCanvas.width = video.videoWidth;
        tempMediaCanvas.height = video.videoHeight;
    }

    return (
        <div id="myLiveVideoDIV" className="canvas-container">
            <video
                id="video"
                autoPlay=""
                playsInline=""
                style={{ display: "none" }}
                width={320}
                height={240}
            />
            <canvas id="videoCanvas" style={{ border: "5px solid", borderRadius: 5 }} />
            <canvas
                id="tempMediaCanvas"
                style={{ border: "5px solid", borderRadius: 5 }}
            />
            <canvas
                id="mainCanvas"
                style={{ cursor: "default", border: "5px solid", borderRadius: 5 }}
            />
            <canvas
                id="drawCanvas"
                style={{
                    display: "none",
                    cursor: "crosshair",
                    border: "5px solid",
                    borderRadius: 5
                }}
            />
            <canvas
                id="eraseCanvas"
                style={{
                    display: "none",
                    cursor: "crosshair",
                    border: "5px solid",
                    borderRadius: 5
                }}
            />
            <canvas
                id="mediaCanvas"
                style={{
                    display: "none",
                    cursor: "crosshair",
                    border: "5px solid",
                    borderRadius: 5
                }}
            />
            <canvas
                id="textCanvas"
                style={{
                    display: "none",
                    cursor: "crosshair",
                    border: "5px solid",
                    borderRadius: 5
                }}
            />
            <video
                id="finalVideo"
                autoPlay=""
                playsInline=""
                style={{ display: "none" }}
                width={320}
            />
        </div>

    );
}

export default LiveVideoObj;