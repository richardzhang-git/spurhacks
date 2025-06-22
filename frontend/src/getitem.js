import './style.css'
import viteLogo from '/vite.svg'

document.querySelector('#app').innerHTML = /*html*/ `
<video id="video" autoplay playsinline style="display: none;"></video>
<canvas id="canvas" width="360" height="360"></canvas>
<div id="message" style="margin: 24px 0 24px 0; color: grey; font-size: 1rem; text-align: center; position: absolute; width: 100%; top: 65%;">Take a photo to begin</div>
<div id="controls" style="display: flex; justify-content: center; align-items: center; flex-direction: column; position: absolute; width: 100%; top: 75%;">
    <button id="take-bb" class="btn btn-primary" style="font-size: 1.3rem; padding: 1rem 2.5rem; min-width: 200px;">Find Item</button>
</div>
<style>
.loader {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid #888;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
  vertical-align: middle;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
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

        ctx.drawImage(video, sx, sy, side, side, 0, 0, 360, 360);
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
controls.addEventListener('click', async (event) => {
    if (event.target.id === 'take-bb') {
        isFrozen = true;
        // Show loader and disable button
        controls.innerHTML = `
            <button id="take-bb" class="btn btn-primary" style="font-size: 1.3rem; padding: 1rem 2.5rem; min-width: 200px;" disabled>
                <span class="loader"></span>Working...
            </button>
        `;

        const imageData = canvas.toDataURL(); // Default is image/png

        try {
            const response = await fetch('http://127.0.0.1:8080/getitem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: imageData })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Parse JSON response

            // --- CHANGED: Store as array of objects in localStorage ---
            let ingredients = JSON.parse('['+localStorage.getItem("key")+']');
//            try {
//                ingredients = JSON.parse(localStorage.getItem("key")) || [];
//            } catch {
//                ingredients = [];
//            }
            // Add new ingredient as an object with name, expiry will be added later
            ingredients.push({ name: data, daysUntilExpire: "" });
            localStorage.setItem("key", JSON.stringify(ingredients));
            // ---------------------------------------------------------

            changeText('Food detected: ' + data);  // Show result
        } catch (err) {
            console.error('Error:', err);
            changeText("Error processing image.");
        }

        cancelAnimationFrame(animationId);

        // Replace button with Confirm/Cancel
        controls.innerHTML = `
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button id="confirm" class="btn btn-success" style="font-size: 1.3rem; padding: 1rem 2.5rem; min-width: 150px;">Confirm</button>
                <button id="retry" class="btn btn-secondary" style="font-size: 1.3rem; padding: 1rem 2.5rem; min-width: 150px;">Retry</button>
            </div>
        `;
    }

    // Handle "Cancel"
    if (event.target.id === 'retry') {
        // --- CHANGED: Remove last object from array of objects ---
        let ingredients = [];
        try {
            ingredients = JSON.parse(localStorage.getItem("key")) || [];
        } catch {
            ingredients = [];
        }
        ingredients.pop();
        localStorage.setItem("key", JSON.stringify(ingredients));
        // --------------------------------------------------------

        isFrozen = false;
        changeText("Take a photo to begin");
        drawFrame();
        // Restore original button
        controls.innerHTML = `
            <button id="take-bb" class="btn btn-primary" style="font-size: 1.3rem; padding: 1rem 2.5rem; min-width: 200px;">Find Item</button>
        `;
    }

    // Handle "Confirm"
    if (event.target.id === 'confirm') {
        controls.innerHTML = `<span style="font-size:1.3rem;">Processing...</span>`;
        window.location.href = '/bestbefore/';
    }
});
