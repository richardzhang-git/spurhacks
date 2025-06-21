import './style.css'
import viteLogo from '/vite.svg'

document.querySelector('#app').innerHTML = /*html*/ `
<video id="video" autoplay playsinline style="display: none;"></video>
<canvas id="canvas" width="384" height="384"></canvas>
<div id="message" style="margin: 10px 0; color: green;"></div> <!-- <-- Add this -->
<div id="controls">
    <button id="take-bb" class="btn btn-primary">Find Item</button>
</div>
`

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const controls = document.getElementById('controls');

let animationId = null;
let isFrozen = false;

function changeText(message) {
    const messageDiv = document.getElementById("message");
    if (messageDiv) {
        messageDiv.textContent = message;
    }
}

function drawFrame() {
    if (isFrozen) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;

    if (vw && vh) {
        const side = Math.min(vw, vh);
        const sx = (vw - side) / 2;
        const sy = (vh - side) / 2;

        ctx.drawImage(video, sx, sy, side, side, 0, 0, 384, 384);
    }

    animationId = requestAnimationFrame(drawFrame);
}

navigator.mediaDevices.getUserMedia({
    video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
    }
})
.then(stream => {
    video.srcObject = stream;

    video.addEventListener('loadedmetadata', () => {
        drawFrame();
    });
})
.catch(err => console.error("Camera access denied:", err));

// Handle initial "Find Best Before Date" button
controls.addEventListener('click', event => {
    if (event.target.id === 'take-bb') {
        isFrozen = true;
        const imageData = canvas.toDataURL(); // Default is image/png
        fetch('http://http://127.0.0.1:5000/getitem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageData })
        })
        .then(response => response.json())       // Parse JSON response
        .then(data => {
            console.log('Response from Flask:', data);  // Show result
        })
        .catch(err => {
            console.error(err);
            changeText("Error processing image.");
        });
//        cost data = response.result
        changeText(response);
        cancelAnimationFrame(animationId);

        // Replace button with Confirm/Cancel
        controls.innerHTML = `
            <button id="confirm" class="btn btn-success">Confirm</button>
            <button id="cancel" class="btn btn-secondary">Cancel</button>
        `;
    }

    // Handle "Cancel"
    if (event.target.id === 'cancel') {
        isFrozen = false;
        changeText("Take a photo to start");
        drawFrame();
        // Restore original button
        controls.innerHTML = `
            <button id="take-bb" class="btn btn-primary">Find Item</button>
        `;
    }

    // Handle "Confirm"
    if (event.target.id === 'confirm') {
        // Stub fetch call

        // Keep frozen, maybe disable buttons if needed
        controls.innerHTML = `<span>Processing...</span>`;
    }
});