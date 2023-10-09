import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Draggable from 'react-draggable';
import './App.css';
// import ToolBox from './toolbox';

const videoConstraints = {
    facingMode: 'user'
};

function App() {
    const [toolboxMode, setToolboxMode] = useState('view');
    const [lineColor, setLineColor] = useState('black');
    const [lineThickness, setLineThickness] = useState(5);
    const [lineOpacity, setLineOpacity] = useState(1);
    const [drawing, setDrawing] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const textCanvasRef = useRef(null);

    const [videoSize, setVideoSize] = useState({
        width: '320px',  // Initial width
        height: '240px'  // Initial height
    });
    // Event handler to update video size
    const increaseSize = () => {
        setVideoSize({
            width: '600px',  // New width
            height: '400px'  // New height
        });
    };

    const decreaseSize = () => {
        setVideoSize({
            width: '320px',  // Reset width
            height: '240px'  // Reset height
        });
    };

    const setupCanvas = () => {
        let canvas = canvasRef.current;
        let webcam = webcamRef.current;
        let w = 320; let h = 240;
        canvas.height = h;
        canvas.width = w;
        webcam.height = h;
        webcam.width = w;
    }

    const handleStartDrawing = (e) => {
        setDrawing(true);
        setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    };

    const handleDraw = (e) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineThickness;
        ctx.globalAlpha = lineOpacity/100;
        ctx.lineCap = "round";
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();

        setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    };

    const handleStopDrawing = () => {
        setDrawing(false);
    };
    
    const changeToolboxMode = () => {
        
    };

    const saveCanvasDrawing = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    const saveScreenshot = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let video = webcamRef.current;

        let temporaryCanvas = document.createElement('canvas');
        let temporaryCtx = temporaryCanvas.getContext('2d');

        temporaryCanvas.width = canvas.width;
        temporaryCanvas.height = canvas.height;

        // Draw the video frame to the temporary drawCanvas.
        temporaryCtx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Then draw the main canvas (drawing) on top of that.
        temporaryCtx.drawImage(canvas, 0, 0);

        // Now save this composite image.
        let link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = temporaryCanvas.toDataURL('image/png');
        link.click();
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const textCanvas = canvasRef.current;
        const textCTX = textCanvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        textCTX.clearRect(0, 0, textCanvas.width, textCanvas.height);
    }

    return (
        <div className="app">
            <Webcam width={videoSize.width} height={videoSize.height}
                audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
            <button onClick={increaseSize}>Increase Size</button>
            <button onClick={decreaseSize}>Decrease Size</button>

            <canvas width={videoSize.width} height={videoSize.height}
                ref={canvasRef} onMouseDown={handleStartDrawing} onMouseMove={handleDraw} onMouseUp={handleStopDrawing} />
            <canvas width={videoSize.width} height={videoSize.height}
                ref={textCanvasRef} onMouseDown={handleStartDrawing} onMouseMove={handleDraw} onMouseUp={handleStopDrawing} />
            
            <Draggable handle=".handle">
                <div className="settings">
                    {/* Settings Controls */}
                    <div id="toolboxheader" className="handle" style={{ marginBottom: 5 }}>
                        Toolbox
                        <span
                            id="closeToolboxBtn"
                            style={{
                                float: "right",
                                width: 32,
                                backgroundColor: "red",
                                textAlign: "center"
                            }}
                        >
                            ×
                        </span>
                    </div>
                    <div id="toolboxSettings" style={{ maxHeight: 500, overflowY: "scroll" }}>
                        <button id="clear" onClick={clearCanvas}>Clear</button>
                        <button id="saveCanvas">Save Drawing</button>
                        <button id="saveScreenshot">Save Screenshot</button>
                        <br />
                        <div id="mousePositions">
                            <text>
                                Mouse Position: <span id="coordinates">0, 0</span>
                            </text>
                            <br />
                            <text>
                                Mouse Down Position: <span id="coordinates2">0, 0</span>
                            </text>
                            <br />
                        </div>
                        <div style={{ marginTop: 5 }}>
                            <label htmlFor="mode">Mode: </label>
                            <select id="mode" value={toolboxMode} onChange={(e) => {setToolboxMode(e.target.value); changeToolboxMode()}}>
                                {/* // onChange={changeToolboxMode}> */}
                                <option value="view" selected=""> View </option>
                                <option value="draw">Draw</option>
                                <option value="erase">Erase</option>
                                <option value="text">Text</option>
                                <option value="addMedia">Add Media</option>
                                <option value="editLiveVideo">Your Live Video</option>
                            </select>
                        </div>
                        <div id="ColorEditor">
                            <label htmlFor="color">Color: </label>
                            <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} />
                        </div>
                        <div id="OpacityEditor">
                            <label>Opacity:</label>
                            <input type="range" id="stroke-size" min={1} max={100} defaultValue={100} value={lineOpacity} onChange={(e) => setLineOpacity(e.target.value)} /> 
                        </div>
                        <div id="eraseMode" style={{ display: "none" }}>
                            <label>Erase Mode:</label>
                            <input
                                type="radio"
                                name="eraseMainMode"
                                id="eraseMain"
                                defaultChecked=""
                            />{" "}
                            Main
                            <input type="radio" name="eraseDrawingMode" id="eraseDrawing" /> Drawing
                            <input type="radio" name="eraseBothMode" id="eraseBoth" /> Both
                        </div>
                        <div id="StrokeSizeEditor">
                            <label htmlFor="stroke-size">Stroke size: </label>
                            <input type="range" id="stroke-size" min={1} max={50} defaultValue={5} value={lineThickness} onChange={(e) => setLineThickness(e.target.value)} />
                            {/* <input type="range" id="stroke-size" min={1} max={50} defaultValue={5} /> */}
                            <br />
                        </div>
                        <div id="TextEditor" style={{ display: "none" }}>
                            <div>
                                <label htmlFor="textInput">Text: </label>
                                <input
                                    type="text"
                                    id="textInput"
                                    maxLength={100}
                                    placeholder="Enter text"
                                />
                                <br />
                            </div>
                            <div>
                                <label htmlFor="fontSelector">Font Style: </label>
                                <select id="fontSelector">
                                    <option value="Arial">Arial</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    {/* Add other fonts as desired */}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="fontType">Font Type: </label>
                                <select id="fontType">
                                    <option value="normal">Regular</option>
                                    <option value="bold">Bold</option>
                                    <option value="italic">Italic</option>
                                    <option value="italic bold">Bold &amp; Italic</option>
                                    {/* Add other fonts as desired */}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="fontSize">Font Size: </label>
                                <select id="fontSize">
                                    <option value={28}>28</option>
                                    <option value={12}>12</option>
                                    <option value={14}>14</option>
                                    <option value={16}>16</option>
                                    <option value={20}>20</option>
                                    <option value={24}>24</option>
                                    <option value={32}>32</option>
                                    <option value={48}>48</option>
                                    <option value={64}>64</option>
                                    {/* Add other sizes as desired */}
                                </select>
                            </div>
                            <div style={{ display: "flex" }}>
                                <label>Angle:</label>
                                <input
                                    id="textAngleSlider"
                                    type="range"
                                    min={-180}
                                    max={180}
                                    defaultValue={0}
                                />
                                <textarea id="textAngleValue" defaultValue={"0"} />°
                            </div>
                        </div>
                        <div id="mediaContainer" style={{ display: "none" }}>
                            <div>
                                <label>Mode:</label>
                                <input type="radio" name="mediaMode" id="library" /> Library
                                <input
                                    type="radio"
                                    name="mediaMode"
                                    id="search"
                                    defaultChecked=""
                                />{" "}
                                Search
                            </div>
                            <div id="mediaTabs">
                                Mode: <text id="mediaSearchType">Image</text>
                                <button className="mediaTab active" data-tab="image" id="imageBtn">
                                    Image
                                </button>
                                <button className="mediaTab" data-tab="audio" id="audioBtn">
                                    Audio
                                </button>
                                <button className="mediaTab" data-tab="video" id="videoBtn">
                                    Video
                                </button>
                            </div>
                            <div id="searchBarDiv" style={{ display: "flex", alignItems: "center" }}>
                                <span className="searchIcon">🔍</span>
                                <input
                                    id="searchBar"
                                    style={{ width: 150 }}
                                    type="text"
                                    placeholder="Search..."
                                />
                                <button
                                    id="goButton"
                                    className="searchbtn"
                                    style={{ padding: 3, margin: 3 }}
                                >
                                    Go
                                </button>
                                <button
                                    id="removeButton"
                                    className="searchbtn"
                                    style={{ display: "none", padding: 3, margin: 3 }}
                                >
                                    Delete
                                </button>
                            </div>
                            {/* <div > */}
                            <div id="mediaDisplay">
                                <div id="mediaList"></div>
                            </div>
                            <div id="base_video_div_" style={{ display: "none" }}>
                                <video
                                    id="base_video"
                                    className="base_video"
                                    src="media/video/Loading.mp4"
                                />
                                <button id="playPauseBtn">Pause</button>
                                <button id="videoBackBtn">Back</button>
                            </div>
                            <div
                                className="mediaSettings"
                                id="audioVideoSettings"
                                style={{ display: "none" }}
                            >
                                <audio id="base_audio" controls="">
                                    <source src="./media/audio/Android-meme-djlunatique.com.mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                                <div style={{ display: "none" }}>
                                    <label>Volume:</label>{" "}
                                    <input
                                        id="volumeSlider"
                                        type="range"
                                        min={0}
                                        max={100}
                                        defaultValue={50}
                                    />
                                    <textarea id="volumeValue" defaultValue={"50"} />
                                    dB%
                                    <br />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <label>Start:</label>
                                    <input
                                        id="mediaStart"
                                        type="range"
                                        min={0}
                                        max={10}
                                        defaultValue="0.1"
                                        placeholder="start time"
                                    />
                                    <text id="mediaStartValue">0</text>
                                    <label>Secs</label> <br />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <label>Stop:</label>
                                    <input
                                        id="mediaStop"
                                        type="range"
                                        min={0}
                                        max={10}
                                        defaultValue="0.1"
                                        placeholder="end time"
                                    />
                                    <text id="mediaStopValue">100</text>
                                    <label>Secs</label> <br />
                                </div>
                                {/* <input type="checkbox" id="medialoop"> <label for="loop" checked>Loop</label> */}
                            </div>
                            <div className="mediaSettings" id="imageSettings">
                                <div id="editModeSelectorDiv">
                                    <label>Edit Mode:</label>
                                    <button id="simpleEdits"> Simple </button>
                                    <button id="advancedEdits"> Advanced </button>
                                </div>
                                <div style={{ display: "none" }} id="HsizeSliderDiv">
                                    <label>Horiz. Size:</label>
                                    <input
                                        id="sizeHSlider"
                                        type="range"
                                        min={10}
                                        max={100}
                                        defaultValue={50}
                                    />
                                    <textarea
                                        id="sizeHValue"
                                        style={{ resize: "none" }}
                                        defaultValue={"50"}
                                    />
                                    <label>%</label>
                                </div>
                                <div style={{ display: "none" }} id="VsizeSliderDiv">
                                    <label>Verti. Size:</label>
                                    <input
                                        id="sizeVSlider"
                                        type="range"
                                        min={10}
                                        max={100}
                                        defaultValue={50}
                                    />
                                    <textarea
                                        id="sizeVValue"
                                        style={{ resize: "none" }}
                                        defaultValue={"50"}
                                    />
                                    <label>%</label>
                                </div>
                                <div style={{ display: "flex" }} id="SsizeSliderDiv">
                                    <label>Size:</label>
                                    <input
                                        id="sizeSlider"
                                        type="range"
                                        min={10}
                                        max={100}
                                        defaultValue={50}
                                    />
                                    <textarea
                                        id="sizeValue"
                                        style={{ resize: "none" }}
                                        defaultValue={"50"}
                                    />
                                </div>
                                <div style={{ display: "flex" }} id="angleSliderDiv">
                                    <label>Angle:</label>
                                    <input
                                        id="angleSlider"
                                        type="range"
                                        min={-180}
                                        max={180}
                                        defaultValue={0}
                                    />
                                    <textarea
                                        id="angleValue"
                                        style={{ resize: "none" }}
                                        defaultValue={"0"}
                                    />{" "}
                                    <label> °</label>
                                </div>
                                <div id="messageDiv" style={{ display: "none" }}>
                                    <label style={{ paddingRight: 2 }}>Text: </label>
                                    <input id="mediaMessage" placeholder="enter a short message" />
                                    <label htmlFor="color" style={{ marginLeft: 3 }}>
                                        Color:
                                    </label>
                                    <input type="color" id="color-picker2" defaultValue="#ff0000" />
                                    <br />
                                </div>
                                <div id="timeDiv" style={{ display: "flex" }}>
                                    <label>Time: </label>
                                    <input id="timeValue" />
                                    <label> Seconds </label>
                                </div>
                            </div>
                        </div>
                        <div
                            id="userVideoPreviewDiv" className="base_video" style={{ display: "none" }}
                        >
                            <video id="userVideoPreview" src="" style={{ margin: 5 }} width={320} />
                        </div>
                        <br />
                        <div id="submitDrawing">
                            <button id="doneBtn" style={{ float: "left" }}>
                                Done
                            </button>
                            <button id="libraryBtn" style={{ marginLeft: 55 }}>
                                Add to Library
                            </button>
                            <button id="sendBtn" style={{ float: "right" }}>
                                Send
                            </button>
                        </div>
                    </div>
                    {/* <div>
                        <label>Color:</label>
                        <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} />
                    </div>
                    <div>
                        <label>Thickness:</label>
                        <input type="number" value={lineThickness} onChange={(e) => setLineThickness(e.target.value)} />
                    </div>
                    <div>
                        <label>Opacity:</label>
                        <input type="number" step="0.1" min="0" max="1" value={lineOpacity} onChange={(e) => setLineOpacity(e.target.value)} />
                    </div> */}
                </div>

            </Draggable>
           
        </div>
    );
}

export default App;
