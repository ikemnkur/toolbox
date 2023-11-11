import React from 'react'
import Draggable from 'react-draggable';

export default function Toolbox({ clearCanvas, saveCanvasDrawing, saveScreenshot, changeToolboxMode,
    changeToSimpleMode, changeToAdvancedMode, setLineOpacity, setLineColor, setLineThickness,
    setMediaOpacity, setToolboxMode, renderTextPreview, updateAngleSlider, updateAngleValue, updateMediaOpacityValue,
    updateSizeHorizontalSlider, updateSizeVerticalSlider, updateSizeSlider, updateSizeValue, updateSizeVerticalValue, updateSizeHorizontalValue,
    toolboxModeRef, toolboxMode, colorEditorRef, colorPickerRef, lineColor, lineOpacity, opacitySliderRef, opacityEditorRef,
    eraseModeRef, strokeSizeEditorRef, lineThickness, textEditorRef, textInputRef, fontSelectorRef, fontSizeRef, fontTypeRef, textAngleValueRef,
    textAngleSliderRef, addMediaDivRef, sizeHorizontalSliderRef, HsizeSliderDivRef, sizeVerticalSliderRef, VsizeSliderDivRef,
    SsizeSliderDivRef, sizeHorizontalValueRef, sizeVerticalValueRef, userVideoPreviewDivRef, videoRef, timeDivRef, timeValueRef, messageDivRef,
    mediaAngleValueRef, mediaOpacityEditorRef, mediaOpacitySliderRef, sizeSliderRef, angleValueRef, angleSliderRef, sizeValueRef, angleSliderDivRef }) {
    return (
        <div>


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
                        <button id="saveCanvas" onClick={saveCanvasDrawing}>Save Drawing</button>
                        <button id="saveScreenshot" onClick={saveScreenshot}>Save Screenshot</button>
                        <br />
                        <div id="mousePositions">
                            <label>
                                Mouse Position: <span id="coordinates">0, 0</span>
                            </label>
                            <br />
                            <label>
                                Mouse Down Position: <span id="coordinates2">0, 0</span>
                            </label>
                            <br />
                        </div>
                        <div style={{ marginTop: 5 }}>
                            <label htmlFor="mode">Mode: </label>
                            <select id="mode" ref={toolboxModeRef} value={toolboxMode} onChange={(e) => { setToolboxMode(e.target.value); changeToolboxMode(e.target.value) }}>
                                {/* // onChange={changeToolboxMode}> */}
                                <option value="view"> View </option>
                                <option value="draw">Draw</option>
                                <option value="erase">Erase</option>
                                <option value="text">Text</option>
                                <option value="addMedia">Add Media</option>
                                <option value="editLiveVideo">Your Live Video</option>
                            </select>
                        </div>
                        <div id="ColorEditor" ref={colorEditorRef} style={{ display: "none" }}>
                            <label htmlFor="color">Color: </label>
                            <input type="color" value={lineColor} ref={colorPickerRef} onChange={(e) => setLineColor(e.target.value)} />
                        </div>
                        <div id="OpacityEditor" ref={opacityEditorRef} style={{ display: "none" }}>
                            <label>Opacity:</label>
                            <input ref={opacitySliderRef} type="range" id="stroke-size" min={1} max={100} value={lineOpacity} onChange={(e) => setLineOpacity(e.target.value)} />
                        </div>
                        <div id="eraseMode" ref={eraseModeRef} style={{ display: "none" }}>
                            <label>Erase Mode:</label>
                            {/* <input
                                type="radio"
                                name="eraseMainMode"
                                id="eraseMain"
                                defaultChecked=""
                            /> */}
                            {/* <label>Main</label>
                            <input type="radio" name="eraseDrawingMode" id="eraseDrawing" /> <label>Drawing</label>
                            <input type="radio" name="eraseBothMode" id="eraseBoth" /> Both */}
                        </div>
                        <div id="StrokeSizeEditor" ref={strokeSizeEditorRef} style={{ display: "none" }}>
                            <label htmlFor="stroke-size">Stroke size: </label>
                            <input type="range" id="stroke-size" min={1} max={50} value={lineThickness} onChange={(e) => setLineThickness(e.target.value)} />
                            {/* <input type="range" id="stroke-size" min={1} max={50} value={5} /> */}
                            <br />
                        </div>
                        <div id="TextEditor" onMouseUp={renderTextPreview} ref={textEditorRef} style={{ display: "none" }}>
                            <div>
                                <label htmlFor="textInput">Text: </label>
                                <input
                                    type="text"
                                    id="textInput"
                                    ref={textInputRef}
                                    maxLength={100}
                                    placeholder="Enter text"
                                    onMouseUp={renderTextPreview}
                                />
                                <br />
                            </div>
                            <div>
                                <label htmlFor="fontSelector">Font Style: </label>
                                <select id="fontSelector" ref={fontSelectorRef} onMouseUp={renderTextPreview}>
                                    <option value="Arial">Arial</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    {/* Add other fonts as desired */}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="fontType">Font Type: </label>
                                <select id="fontType" ref={fontTypeRef} onMouseUp={renderTextPreview}>
                                    <option value="normal">Regular</option>
                                    <option value="bold">Bold</option>
                                    <option value="italic">Italic</option>
                                    <option value="italic bold">Bold &amp; Italic</option>
                                    {/* Add other fonts as desired */}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="fontSize">Font Size: </label>
                                <select id="fontSize" ref={fontSizeRef} onMouseUp={renderTextPreview}>
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
                                    ref={textAngleSliderRef}
                                    type="range"
                                    min={-180}
                                    max={180}
                                    // value={0}
                                    onMouseUp={renderTextPreview}
                                />
                                <textarea id="textAngleValue" onMouseUp={renderTextPreview} //value={"0"} 
                                ref={textAngleValueRef} />°
                            </div>
                        </div>
                        <div id="addMediaContainer" ref={addMediaDivRef} style={{ display: "none" }}>
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
                                Media: <label id="mediaSearchType">Image</label>
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
                                        // value={50}
                                    />
                                    <textarea id="volumeValue" 
                                    //value={"50"} 
                                    />
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
                                        // value="0.1"
                                        placeholder="start time"
                                    />
                                    <label id="mediaStartValue">0</label>
                                    <label>Secs</label> <br />
                                </div>
                                <div style={{ display: "flex" }}>
                                    <label>Stop:</label>
                                    <input
                                        id="mediaStop"
                                        type="range"
                                        min={0}
                                        max={10}
                                        // value="0.1"
                                        placeholder="end time"
                                    />
                                    <label id="mediaStopValue">100</label>
                                    <label>Secs</label> <br />
                                </div>
                                {/* <input type="checkbox" id="medialoop"> <label for="loop" checked>Loop</label> */}
                            </div>
                            <div className="mediaSettings" id="imageSettings">
                                <div id="editModeSelectorDiv">
                                    <label>Edit Mode:</label>
                                    <button id="simpleEdits" onClick={changeToSimpleMode}> Simple </button>
                                    <button id="advancedEdits" onClick={changeToAdvancedMode} >Advanced </button>
                                </div>
                                <div style={{ border: 3, borderRadius: 5 }}>
                                    <div style={{ display: "none" }} id="HsizeSliderDiv" ref={HsizeSliderDivRef}>
                                        <label>X-Scale:</label>
                                        <input
                                            id="sizeHorizontalSlider"
                                            ref={sizeHorizontalSliderRef}
                                            onChange={updateSizeHorizontalSlider}
                                            type="range"
                                            min={10}
                                            max={100}
                                            value={50}
                                        />
                                        <textarea
                                            id="sizeHorizontalValue"
                                            ref={sizeHorizontalValueRef}
                                            onChange={updateSizeHorizontalValue}
                                            style={{ resize: "none" }}
                                            value={"50"}
                                        />
                                        <label>%</label>
                                    </div>
                                    <div style={{ display: "none" }} id="VsizeSliderDiv" ref={VsizeSliderDivRef}>
                                        <label>Y-Scale:</label>
                                        <input
                                            id="sizeVerticalSlider"
                                            ref={sizeVerticalSliderRef}
                                            onChange={updateSizeVerticalSlider}
                                            type="range"
                                            min={10}
                                            max={100}
                                            value={50}
                                        />
                                        <textarea
                                            id="sizeVerticalValue"
                                            onChange={updateSizeVerticalValue}
                                            ref={sizeVerticalValueRef}
                                            style={{ resize: "none" }}
                                            value={"50"}
                                        />
                                        <label>%</label>
                                    </div>
                                </div>

                                <div style={{ display: "flex" }} id="SsizeSliderDiv" ref={SsizeSliderDivRef}>
                                    <label>Size:</label>
                                    <input
                                        id="sizeSlider"
                                        ref={sizeSliderRef}
                                        type="range"
                                        min={10}
                                        max={100}
                                        defaultValue={50}
                                        onChange={updateSizeSlider}
                                    />
                                    <textarea
                                        id="sizeValue"
                                        ref={sizeValueRef}
                                        style={{ resize: "none" }}
                                        defaultValue={"50"}
                                        onChange={updateSizeValue}
                                    />
                                </div>
                                <div style={{ display: "flex" }} id="angleSliderDiv" ref={angleSliderDivRef}>
                                    <label>Angle:</label>
                                    <input
                                        id="angleSlider"
                                        ref={angleSliderRef}
                                        type="range"
                                        min={-180}
                                        max={180}
                                        defaultValue={0}
                                        onChange={updateAngleSlider}
                                    />
                                    <textarea
                                        id="angleValue"
                                        ref={angleValueRef}
                                        style={{ resize: "none" }}
                                        defaultValue={"0"}
                                        onChange={updateAngleValue}
                                    />{" "}
                                    <label> °</label>
                                </div>
                                <div id="OpacityEditor" ref={mediaOpacityEditorRef} style={{ display: "none" }}>
                                    <label>Opacity:</label>
                                    <input ref={mediaOpacitySliderRef} type="range" id="stroke-size" min={1} max={100} value={50} onChange={(e) => setMediaOpacity(e.target.value)} />
                                    <textarea
                                        id="angleValue"
                                        ref={mediaAngleValueRef}
                                        style={{ resize: "none" }}
                                        value={"0"}
                                        onChange={updateMediaOpacityValue}
                                    />{" "}
                                    <label> °</label>
                                </div>
                                <div id="messageDiv" ref={messageDivRef} style={{ display: "none" }}>
                                    <label style={{ paddingRight: 2 }}>Text: </label>
                                    <input id="mediaMessage" placeholder="enter a short message" />
                                    <label htmlFor="color" style={{ marginLeft: 3 }}>
                                        Color:
                                    </label>
                                    <input type="color" id="color-picker2" 
                                    // value="#ff0000" 
                                    />
                                    <br />
                                </div>
                                <div id="timeDiv" ref={timeDivRef} style={{ display: "flex" }}>
                                    <label>Time: </label>
                                    <input id="timeValue" ref={timeValueRef} />
                                    <label> Seconds </label>
                                </div>
                            </div>
                        </div>
                        <div id="userVideoPreviewDiv" ref={userVideoPreviewDivRef} className="base_video" style={{ display: "none" }}>
                            {/* <video ref={videoRef} style={{ display: 'none' }}></video> */}
                            <video preload="none" ref={videoRef} id="userVideoPreview" src="" style={{ margin: 5, background: "cyan", width: 240, height: 180 }} width={320} />
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

            </Draggable>
        </div>
    )
}
