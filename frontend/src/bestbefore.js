import './style.css'
import viteLogo from '/vite.svg'

document.querySelector('#app').innerHTML = /*html*/ `
<video id="video" autoplay playsinline style="display: none;"></video>
<canvas id="canvas" width="384" height="384"></canvas>
<button id="take-bb" class="btn btn-primary">Find Best Before Date</button>
`

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const captureBtn = document.getElementById('take-bb');

navigator.mediaDevices.getUserMedia({
    video: {
        width: { ideal: 1280 }, // Request a reasonably high resolution
        height: { ideal: 720 },
    }
})
.then(stream => {
    video.srcObject = stream;

    video.addEventListener('loadedmetadata', () => {
        // Wait until the video dimensions are available
        captureBtn.addEventListener('click', () => {
            const vw = video.videoWidth;
            const vh = video.videoHeight;
            const side = Math.min(vw, vh);

            const sx = (vw - side) / 2;
            const sy = (vh - side) / 2;

            // Draw the centered square portion of the video onto the 384x384 canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, sx, sy, side, side, 0, 0, 384, 384);
        });
    });
})
.catch(err => console.error("Camera access denied:", err));