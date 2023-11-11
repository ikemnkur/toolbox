import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import Toolbox from './components/Toolbox/Toolbox';
import './App.css';

const videoConstraints = {
    facingMode: 'user'
};

function App() {
    const [toolboxMode, setToolboxMode] = useState('view');
    const [lineColor, setLineColor] = useState('black');
    const [lineThickness, setLineThickness] = useState(5);
    const [lineOpacity, setLineOpacity] = useState(100);
    const [drawing, setDrawing] = useState(false);
    const [allowEraser, setAllowEraser] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const webcamRef = useRef(null);
    const videoRef = useRef(null);

    const drawCanvasRef = useRef(null);
    const drawOpacityCanvasRef = useRef(null);
    const canvasVideoRef = useRef(null);
    const eraseCanvasRef = useRef(null);
    const textCanvasRef = useRef(null);
    const addMediaCanvasRef = useRef(null);
    const compositeCanvasRef = useRef(null);


    const toolboxModeRef = useRef(null);
    const colorPickerRef = useRef(null);
    const opacitySliderRef = useRef(null);
    const colorEditorRef = useRef(null);
    const opacityEditorRef = useRef(null);
    const eraseModeRef = useRef(null);
    const strokeSizeEditorRef = useRef(null);
    const textEditorRef = useRef(null);
    const userVideoPreviewDivRef = useRef(null);
    const addMediaDivRef = useRef(null);
    
    const [videoSize, setVideoSize] = useState({
        width: '320px',  // Initial width
        height: '240px'  // Initial height
    });

    const setUpCanvas = ()=>{
        const eraserCanvas = eraseCanvasRef.current;
        const textCanvas = textCanvasRef.current;
        const drawOpacityCanvas = drawOpacityCanvasRef.current;
        const drawCanvas = drawCanvasRef.current;
        eraserCanvas.style.display = 'none';
        textCanvas.style.display = 'none';
        drawCanvas.style.display = 'none';
        drawOpacityCanvas.style.display = 'none';
        console.log('Canvases have been setup successfully.')
    }
    

    useEffect(() => {
        // Set up webcam access
        const initWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = await stream;
                videoRef?.current?.play();

                // Start the rendering loop
                drawToCanvas();
            } catch (err) {
                console.error("Error accessing webcam:", err);
            }
        };

        const drawToCanvas = () => {
            const video = videoRef.current;
            const canvas = canvasVideoRef.current;
            const ctx = canvas.getContext('2d');

            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                // Draw the current video frame to canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            }

            // Continue drawing the next frame to canvas
            requestAnimationFrame(drawToCanvas);
        };

        initWebcam();

        console.log("thingy")

        return () => {
            // Cleanup: stop any streams to release webcam access
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

   
    setInterval(() => {
        setTime(time + 1);
        if (time > 99) {
            setTime(0);
            console.log("new time loop")
        }
    }, 50);

    // const incrementTime = function () {
    //     if(setTime() == null){
            
    //     } else {
    //         setTime(time + 1);
    //         if (time > 99) {
    //             setTime(0);
    //             console.log("new time loop")
    //         }
            
    //     }
    //     incrementTime();
    // }
      
    
    //  useEffect(() => {
    //     incrementTime();
    //     return () => {
        
    //     }
    // }, [])
  
    


    // // Event handler to update video size
    // const increaseSize = () => {
    //     setVideoSize({
    //         width: '600px',  // New width
    //         height: '400px'  // New height
    //     });
    // };

    // const decreaseSize = () => {
    //     setVideoSize({
    //         width: '320px',  // Reset width
    //         height: '240px'  // Reset height
    //     });
    // };

    const handleStartDrawing = (e) => {
        setDrawing(true);
        console.log('start drawing');
        setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    };

    const handleDraw = (e) => {
        console.log('drawing value: ', drawing)
        if (!drawing) {
            return;
        }
        const drawCanvas = drawCanvasRef.current;
        const drawOpacityCanvas = drawOpacityCanvasRef.current;
        const ctxDraw = drawCanvas.getContext('2d');
        
        const toolboxMode = toolboxModeRef.current;
        drawCanvas.style.display = 'block';
       
        if (toolboxMode.value === 'draw') {
            // if (toolboxMode.value === 'draw') {
            ctxDraw.globalCompositeOperation = 'source-over';
            ctxDraw.beginPath();
            ctxDraw.strokeStyle = lineColor;
            ctxDraw.lineWidth = lineThickness;
            ctxDraw.globalAlpha = 1.0;  // Resetting the opacity to default
            // ctxDraw.globalAlpha = lineOpacity / 100;
            ctxDraw.lineCap = "round";
            ctxDraw.moveTo(position.x, position.y);
            ctxDraw.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            ctxDraw.stroke();
        }

        console.log("drawing")
        setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    };

    const handleStopDrawing = (e) => {
        //convert the drawn image to one with a transparency set to the opacity slider value
        const destCanvas = drawOpacityCanvasRef.current;
        const srcCanvas = drawCanvasRef.current;

        const srcCtx = srcCanvas.getContext('2d');
        const destCtx = destCanvas.getContext('2d');

        // Draw an image onto the source canvas
        // const img = new Image();
        // img.onload = () => {
        //   srcCtx.drawImage(img, 0, 0);

        // Now draw the source canvas onto the destination canvas with 50% opacity
        destCtx.globalAlpha = lineOpacity / 100;
        destCtx.drawImage(srcCanvas, 0, 0);
        destCtx.globalAlpha = 1.0;  // Resetting the opacity to default
        // };
        // img.src = 'path_to_your_image.jpg'; // Replace with your image path

        setTimeout(() => {
            srcCtx.clearRect(0, 0, srcCanvas.width, srcCanvas.height);
        }, 100)

        setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
        setDrawing(false);
    };

    const showEraser = (e) => {
        const toolboxMode = toolboxModeRef.current;
        console.log("toolboxMode: " + toolboxMode.value);
        if (toolboxMode.value === 'erase') {
            setAllowEraser(true);
        }
        console.log('Mouse: (' + position.x + ',' + position.y + ')');
        setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }

    const doErasing = (e) => {
        const toolboxMode = toolboxModeRef.current;
        if (toolboxMode.value === 'erase' & allowEraser) {
            const drawCanvas = drawCanvasRef.current;
            const eraserCanvas = eraseCanvasRef.current;
            let eraseCTX = eraserCanvas.getContext('2d');
            let size = lineThickness * 2;

            eraseCTX.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
            // mainCTX.clearRect(x - size / 2, y - size / 2, size, size);
            eraseCTX.save();
            eraseCTX.globalCompositeOperation = 'source-over';
            eraseCTX.fillStyle = 'white';
            eraseCTX.strokeStyle = 'black';
            eraseCTX.lineWidth = 1;
            eraseCTX.fillRect(position.x - size / 2, position.y - size / 2, size, size);
            eraseCTX.strokeRect(position.x - size / 2, position.y - size / 2, size, size);
            eraseCTX.restore();

            const drawOpacityCanvas = drawOpacityCanvasRef.current;
            const ctxErase = drawOpacityCanvas.getContext('2d');
            if (toolboxMode.value === 'erase') {
                // let radius = strokeSizeSlider.value;
                ctxErase.globalCompositeOperation = 'destination-out';
                let size = lineThickness * 2;
                ctxErase.fillRect(position.x - size / 2, position.y - size / 2, size, size);
                // context.arc(x2, y2, radius, 0, Math.PI * 2);
                ctxErase.fill();
            }
        }
        console.log('Mouse: (' + position.x + ',' + position.y + ')');
        setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }

    const hideEraser = () => {
        setAllowEraser(false);
        const eraserCanvas = eraseCanvasRef.current;
        let eraseCTX = eraserCanvas.getContext('2d');
        eraseCTX.clearRect(0, 0, eraserCanvas.width, eraserCanvas.height);
    }

    const startRenderText = () => {
        setIsMouseDown(1);
    }
    const stopRenderText = () => {
        setIsMouseDown(0);
    }
    const renderMedia = () => {

    }

    let fontTypeRef = useRef(null);
    let fontSizeRef = useRef(null);
    let fontSelectorRef = useRef(null);
    let textAngleValueRef = useRef(null);
    let textInputRef = useRef(null);
    let textAngleSliderRef = useRef(null);
    const [time, setTime] = useState(0);
    const [mouseDown, setIsMouseDown] = useState(0);

    // -----------rendering the text in real time at mouse position
    function renderTextPreview(e) {

        let mouseX2 = position.x; let mouseY2 = position.y;
        if(mouseDown == 1 || e == null) {

            const textCanvas = textCanvasRef.current;
            const textCTX = textCanvas.getContext('2d');
            let fontType = fontTypeRef.current;
            let fontSizeSelector = fontSizeRef.current;
            let fontSelector = fontSelectorRef.current;
            let textInput = textInputRef.current;
            let textAngleSlider = textAngleSliderRef.current;
            let textAngleValue = textAngleValueRef.current;
    
            let colorPicker = lineColor;
    
            textCTX.clearRect(0, 0, textCanvas.width, textCanvas.height);
            textCTX.font = `${fontType.value} ${fontSizeSelector.value}px ${fontSelector.value}`;
            textCTX.fillStyle = colorPicker;
            textCTX.globalCompositeOperation = 'source-over';
    
            let angle = textAngleSlider.value;
            let height = fontSizeSelector.value;
            let width = (textInput.value.length + 2) * fontSizeSelector.value / 2;
    
            // translate and rotate the canvas so that the image is centered
            textCTX.save();
            textCTX.translate(mouseX2, mouseY2);
            textCTX.rotate(angle * Math.PI / 180);
            textCTX.translate(-mouseX2, -mouseY2);
    
            // draw the "edit image" background behind the media object
            if (Math.floor(time / 10) % 2) textCTX.strokeStyle = '#ff0000';
            else textCTX.strokeStyle = '#000000';
    
            textCTX.globalAlpha = .2;
            textCTX.shadowColor = "#d53";
            textCTX.shadowBlur = 20;
            textCTX.lineJoin = "round";
            textCTX.lineWidth = 5;
            textCTX.strokeRect((mouseX2 - width / 2 - 4), (mouseY2 - height / 2 + 4), width, height);
            textCTX.globalAlpha = lineOpacity/100;
    
            // draw the image
            textCTX.fillText(textInput.value, mouseX2 - width / 2, mouseY2 + height / 2);
            // textCTX.drawImage(base_image, mouseX2 - width / 2, mouseY2 - height / 2, width, height);
            textCTX.restore();
            textCTX.globalAlpha = 1;
        }
        if (e != null) 
           setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }

    const changeToolboxMode = (mode) => {
        console.log('changeToolboxMode : ', mode);
        const toolboxMode = toolboxModeRef.current;
        const eraserCanvas = eraseCanvasRef.current;
        const textCanvas = textCanvasRef.current;
        const drawCanvas = drawCanvasRef.current;
        const drawOpacityCanvas = drawOpacityCanvasRef.current;
        const addMediaCanvas = addMediaCanvasRef.current;
        const addMediaDiv = addMediaDivRef.current;
       
        if (mode === 'view') {
            eraserCanvas.style.display = 'none';
            textCanvas.style.display = 'none';
            drawCanvas.style.display = 'none';
            drawOpacityCanvas.style.display = 'none';
            opacityEditorRef.current.style.display = 'none'; 
            strokeSizeEditorRef.current.style.display = 'none'; 
            colorEditorRef.current.style.display = 'none'; 
        }
        if (mode === 'erase') {
            eraserCanvas.style.display = 'block';
            textCanvas.style.display = 'none';
            drawCanvas.style.display = 'none';
            drawOpacityCanvas.style.display = 'block';
            opacityEditorRef.current.style.display = 'none'; 
            strokeSizeEditorRef.current.style.display = 'block'; 
            colorEditorRef.current.style.display = 'none'; 
            eraseModeRef.current.style.display = 'block';
        } else {
            eraseModeRef.current.style.display = 'none';
        }
        if (mode === 'draw') {
            eraserCanvas.style.display = 'none';
            textCanvas.style.display = 'none';
            drawCanvas.style.display = 'block';
            drawOpacityCanvas.style.display = 'block';
            opacityEditorRef.current.style.display = 'block';
            strokeSizeEditorRef.current.style.display = 'block'; 
            colorEditorRef.current.style.display = 'block';  
        }
        if (mode === 'text') {
            eraserCanvas.style.display = 'none';
            textCanvas.style.display = 'block';
            drawCanvas.style.display = 'none';
            drawOpacityCanvas.style.display = 'none';
            opacityEditorRef.current.style.display = 'block'; 
            strokeSizeEditorRef.current.style.display = 'none';
            colorEditorRef.current.style.display = 'block'; 
            textEditorRef.current.style.display = 'block'; 
        } else {
            textEditorRef.current.style.display = 'none'; 
        }
        if (mode === 'addMedia') {
            eraserCanvas.style.display = 'none';
            textCanvas.style.display = 'none';
            drawCanvas.style.display = 'none';
            drawOpacityCanvas.style.display = 'none';
            addMediaCanvas.style.display = 'block';
            addMediaDiv.style.display = 'block';
            colorEditorRef.current.style.display = 'none'; 
            opacityEditorRef.current.style.display = 'none'; 
            strokeSizeEditorRef.current.style.display = 'none'; 
        } else { 
            addMediaCanvas.style.display = 'none';
            addMediaDiv.style.display = 'none';
        } 
        if (mode === 'editLiveVideo') {
            eraserCanvas.style.display = 'none';
            textCanvas.style.display = 'none';
            drawCanvas.style.display = 'none';
            drawOpacityCanvas.style.display = 'none';
            addMediaCanvas.style.display = 'none';
            addMediaDiv.style.display = 'none'; 
            
            opacityEditorRef.current.style.display = 'none'; 
            strokeSizeEditorRef.current.style.display = 'none'; 
            userVideoPreviewDivRef.current.style.display = 'block';
        } else { 
            userVideoPreviewDivRef.current.style.display = 'none';
        }
    };


    const saveCanvasDrawing = () => {
        const canvas = drawOpacityCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const link = document.createElement('a');
        link.download = 'canvas-drawing-solo.png';
        link.href = drawOpacityCanvasRef.current.toDataURL();
        link.click();
    }

    const saveScreenshot = () => {
        const canvas = drawOpacityCanvasRef.current;
        const ctx = canvas.getContext('2d');

        const ctxComposite = compositeCanvasRef.current.getContext('2d');

        
        drawVideoFrame();
        ctxComposite.drawImage(canvas, 0, 0);

        // Download the composite canvas image
        const link = document.createElement('a');
        link.download = 'composite-image.png';
        link.href = compositeCanvasRef.current.toDataURL();
        link.click();
    }

    const clearCanvas = () => {
        const canvas = drawOpacityCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const textCanvas = drawCanvasRef.current;
        const textCTX = textCanvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        textCTX.clearRect(0, 0, textCanvas.width, textCanvas.height);
    }

    const drawVideoFrame = () => {
        const video = videoRef.current;
        const canvas = compositeCanvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    };


    const handleVideoLoaded = () => {
        // The video has loaded metadata such as dimensions, duration, etc.
        // Here, you can set the canvas dimensions to match the video if desired.
        const video = webcamRef.current;
        const canvas = drawCanvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    };


    // const videoRef = useRef(null);
    // const canvasRef = useRef(null);
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [opacity, setMediaOpacity] = useState(1);
  

    const drawVideoOnCanvas = () => {
        const video = videoRef.current;
        const canvas = addMediaCanvasRef.current;
        const ctx = canvas.getContext('2d');
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.globalAlpha = opacity/100;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(scaleX, scaleY);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-canvas.width / 2 + translateX, -canvas.height / 2 + translateY);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();
        requestAnimationFrame(drawVideoOnCanvas);
    };

    const handleVideoPlay = () => {
        drawVideoOnCanvas();
    };

    let sizeHorizontalSliderRef = useRef(null);
    let sizeVerticalSliderRef = useRef(null);
    let sizeSliderRef = useRef(null);
    let sizeValueRef = useRef(null);
    let sizeHorizontalValueRef = useRef(null);
    let sizeVerticalValueRef = useRef(null);
    let HsizeSliderDivRef = useRef(null);
    let VsizeSliderDivRef = useRef(null);
    let timeDivRef = useRef(null);
    let timeValueRef = useRef(null);
    let angleSliderDivRef = useRef(null);
    let angleValueRef = useRef(null);
    let angleSliderRef = useRef(null);
    let messageDivRef = useRef(null);
    let SsizeSliderDivRef = useRef(null); // default
    
    let mediaOpacitySliderRef = useRef(null);
    let mediaOpacityEditorRef = useRef(null);
    let mediaAngleValueRef = useRef(null);
   
    let updateMediaOpacityValue = () => {
        setMediaOpacity(parseInt(mediaOpacitySliderRef.current.value))
        mediaAngleValueRef.current.value = parseInt(mediaOpacitySliderRef.current.value)
    }

    const changeToSimpleMode = () => {
        messageDivRef.current.style.display = "none";
        SsizeSliderDivRef.current.style.display = "block";
        HsizeSliderDivRef.current.style.display = "none";
        VsizeSliderDivRef.current.style.display = "none";
        timeDivRef.current.style.display = "none";
    }


    const changeToAdvancedMode = () => {
        messageDivRef.current.style.display = "block";
        SsizeSliderDivRef.current.style.display = "none";
        HsizeSliderDivRef.current.style.display = "block";
        VsizeSliderDivRef.current.style.display = "block";
        timeDivRef.current.style.display = "block";
    }
    
    // Angle slider
    const updateAngleSlider = () => {
        setRotation(parseInt(angleSliderRef.current.value))
        angleValueRef.current.value = parseInt(angleSliderRef.current.value)
    }

    const updateAngleValue = () => {
        setRotation(parseInt(angleValueRef.current.value)) 
        angleSliderRef.current.value = parseInt(angleValueRef.current.value)
    }

    //Scale slider
    const updateSizeSlider = () => {
        setScaleX(parseInt(sizeSliderRef.current.value)/100)
        setScaleY(parseInt(sizeSliderRef.current.value)/100)
        console.log("updateSizeSlider: " + sizeSliderRef.current.value)
        sizeValueRef.current.value = parseInt(sizeSliderRef.current.value)
    }

    const updateSizeValue = () => {
        setScaleX(parseInt(sizeValueRef.current.value)/100) 
        setScaleY(parseInt(sizeValueRef.current.value)/100) 
        sizeSliderRef.current.value = parseInt(sizeValueRef.current.value)
    }

    //X-Scale slider
    const updateSizeHorizontalSlider = () => {
        setScaleX(parseInt(sizeHorizontalSliderRef.current.value))
        sizeHorizontalValueRef.current.value = parseInt(sizeHorizontalValueRef.current.value)
    }

    const updateSizeHorizontalValue = () => {
        setScaleX(parseInt(sizeHorizontalValueRef.current.value)) 
        sizeHorizontalSliderRef.current.value = parseInt(sizeHorizontalValueRef.current.value)
    }

    //Y-Scale slider
    const updateSizeVerticalSlider = () => {
        setScaleY(parseInt(sizeVerticalSliderRef.current.value))
        sizeVerticalValueRef.current.value = parseInt(sizeVerticalValueRef.current.value)
    }

    const updateSizeVerticalValue = () => {
        setScaleY(parseInt(sizeVerticalValueRef.current.value)) 
        sizeVerticalSliderRef.current.value = parseInt(sizeVerticalValueRef.current.value)
    }



    return (
        <div className="app">
            {/* <div style={{ border: '5px solid rgba(0, 0, 0, 0.5)' }}> */}
            {/* <div style={{border: '5px solid rgba(0, 0, 0, 0.5)'}} >Hello</div> */}
            {/* <Webcam width={videoSize.width} height={videoSize.height}
                    audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} /> */}
            <div>
                <video preload="none" ref={videoRef} style={{ display: 'none' }}></video>
                {/*             
                            <button onClick={increaseSize}>Increase Size</button>
                            <button onClick={decreaseSize}>Decrease Size</button> */}

                <canvas id="videoCanvas" width={videoSize.width} height={videoSize.height}
                    ref={canvasVideoRef} onLoad={setUpCanvas}/>

                <canvas id="drawOpacityCanvas" width={videoSize.width} height={videoSize.height}
                    ref={drawOpacityCanvasRef} />

                <canvas id="drawCanvas" width={videoSize.width} height={videoSize.height}
                    ref={drawCanvasRef} onMouseDown={handleStartDrawing} onMouseMove={handleDraw} onMouseUp={handleStopDrawing}/>

                <canvas id="eraseCanvas" width={videoSize.width} height={videoSize.height}
                    ref={eraseCanvasRef} onMouseDown={showEraser} onMouseMove={doErasing} onMouseUp={hideEraser} />

                <canvas id="textCanvas" width={videoSize.width} height={videoSize.height}
                    ref={textCanvasRef} onMouseDown={startRenderText} onMouseMove={renderTextPreview} onMouseUp={stopRenderText} />

                <canvas id="addMedia" width={videoSize.width} height={videoSize.height}
                    ref={addMediaCanvasRef} onMouseDown={renderMedia} onMouseMove={renderMedia} onMouseUp={renderMedia} />

                <canvas ref={compositeCanvasRef} width={videoSize.width} height={videoSize.height} style={{ display: 'none' }}></canvas>
            </div>

            {/* </div> */}

            <Toolbox 
                clearCanvas={clearCanvas}
                saveCanvasDrawing={saveCanvasDrawing}
                saveScreenshot={saveScreenshot}
                changeToolboxMode={changeToolboxMode}
                changeToSimpleMode={changeToSimpleMode}

                changeToAdvancedMode={changeToAdvancedMode}
                setLineOpacity={setLineOpacity}
                setLineColor={setLineColor}
                setLineThickness={setLineThickness}
                setMediaOpacity={setMediaOpacity}
                setToolboxMode={setToolboxMode}
                renderTextPreview={renderTextPreview}
                updateAngleSlider={updateAngleSlider}
                updateAngleValue={updateAngleValue}
                updateMediaOpacityValue={updateMediaOpacityValue}
                updateSizeHorizontalSlider={updateSizeHorizontalSlider}
                updateSizeVerticalSlider={updateSizeVerticalSlider}
                updateSizeSlider={updateSizeSlider}
                updateSizeValue={updateSizeValue}
                updateSizeVerticalValue={updateSizeVerticalValue}
                updateSizeHorizontalValue={updateSizeHorizontalValue}

                toolboxModeRef={toolboxModeRef}
                toolboxMode={toolboxMode}
                colorEditorRef={colorEditorRef}
                colorPickerRef={colorPickerRef}
                lineColor={lineColor}
                lineOpacity={lineOpacity}
                opacitySliderRef={opacitySliderRef}
                opacityEditorRef={opacityEditorRef}
                eraseModeRef={eraseModeRef}
                strokeSizeEditorRef={strokeSizeEditorRef}
                lineThickness={lineThickness}
                textEditorRef={textEditorRef}
                textInputRef={textInputRef}
                fontSelectorRef={fontSelectorRef}
                fontSizeRef={fontSizeRef}
                fontTypeRef={fontTypeRef}
                textAngleValueRef={textAngleValueRef}
                textAngleSliderRef={textAngleSliderRef}
                addMediaDivRef={addMediaDivRef}
                sizeHorizontalSliderRef={sizeHorizontalSliderRef}
                HsizeSliderDivRef={HsizeSliderDivRef}
                sizeVerticalSliderRef={sizeVerticalSliderRef}
                VsizeSliderDivRef={VsizeSliderDivRef}
                SsizeSliderDivRef={SsizeSliderDivRef}
                sizeHorizontalValueRef={sizeHorizontalValueRef}
                sizeVerticalValueRef={sizeVerticalValueRef}
                userVideoPreviewDivRef={userVideoPreviewDivRef}
                videoRef={videoRef}
                timeDivRef={timeDivRef}
                timeValueRef={timeValueRef}
                messageDivRef={messageDivRef}
                mediaAngleValueRef={mediaAngleValueRef}
                mediaOpacityEditorRef={mediaOpacityEditorRef}
                mediaOpacitySliderRef={mediaOpacitySliderRef}
                sizeSliderRef={sizeSliderRef}
                angleValueRef={angleValueRef}
                angleSliderRef={angleSliderRef}
                sizeValueRef={sizeValueRef}
                angleSliderDivRef={angleSliderDivRef}           
            />

        </div>
    );
}

export default App;


