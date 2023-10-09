import React, { useState } from 'react';
// import React, { useEffect } from 'react';

import './toolbox.css';

var ToolBox = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    // function changeToolboxMode(e) {

    // }

    let toolbox = document.getElementById("toolbox");

    //Handles the dragging of the toolbar around the DOM
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // dragElement(toolbox);
    
    return (
        <div id="toolbox">
            <div id="toolboxheader" style={{ marginBottom: 5 }}>
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
                <button id="clear">Clear</button>
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
                    <select id="mode">
                        {/* // onChange={changeToolboxMode}> */}
                        <option value="view" selected="">
                            View
                        </option>
                        <option value="draw">Draw</option>
                        <option value="erase">Erase</option>
                        <option value="text">Text</option>
                        <option value="addMedia">Add Media</option>
                        <option value="editLiveVideo">Your Live Video</option>
                    </select>
                </div>
                <div id="ColorEditor">
                    {/* <div id="drawMode" style="display: block;">
              <label>Draw Mode:</label>
              <input type="radio" id="pencilMode" checked> Pencil
              <input type="radio" id="eraserMode"> Eraser
          </div> */}
                    <label htmlFor="color">Color: </label>
                    <input type="color" id="color-picker" defaultValue="#ff0000" />
                    <br />
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
                    <input type="range" id="stroke-size" min={1} max={50} defaultValue={5} />
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
                    id="userVideoPreviewDiv"
                    className="base_video"
                    style={{ display: "none" }}
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
        </div>

    );
}

export default ToolBox;