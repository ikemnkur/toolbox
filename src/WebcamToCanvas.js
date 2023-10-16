import React, { useRef, useEffect } from 'react';

function WebcamToCanvas() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Set up webcam access
        const initWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                videoRef.current.play();

                // Start the rendering loop
                drawToCanvas();
            } catch (err) {
                console.error("Error accessing webcam:", err);
            }
        };

        const drawToCanvas = () => {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                // Draw the current video frame to canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            }

            // Continue drawing the next frame to canvas
            requestAnimationFrame(drawToCanvas);
        };

        initWebcam();

        return () => {
            // Cleanup: stop any streams to release webcam access
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div>
            {/* Hidden video element */}
            <video ref={videoRef} style={{ display: 'none' }}></video>

            {/* Canvas to show the webcam feed */}
            <canvas ref={canvasRef} width="640" height="480"></canvas>
        </div>
    );
}

export default WebcamToCanvas;
