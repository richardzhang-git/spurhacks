import './style.css'
import viteLogo from '/vite.svg'

document.querySelector('#app').innerHTML = /*html*/ `
<video id="video" autoplay playsinline style="display: none;"></video>
<canvas id="canvas" width="360" height="360"></canvas>
<div id="message" style="margin: 10px 0; color: green;">Take a photo to begin</div>
<div id="controls">
    <button id="take-bb" class="btn btn-primary">Find Best Before Date</button>
    <button id="guess-bb" class="btn btn-primary">No Exact Date</button>
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
        const imageData = canvas.toDataURL(); // Default is image/png

        try {
            const response = await fetch('http://127.0.0.1:5000/getbb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageData })
            });

            const text = await response.text();  // Log the raw response
            console.log("Raw response:", text);
            var temp_arr = '[' + localStorage.getItem("key") + ']';
            console.log(temp_arr);
            temp_arr = JSON.parse(temp_arr);
            console.log(temp_arr[temp_arr.length - 1]);
            temp_arr[temp_arr.length - 1].push(text);
            console.log(temp_arr[temp_arr.length - 1]);
            for (let i = 0; i < temp_arr.length; i++) {
                temp_arr[i] = '["' + temp_arr[i].join('", "') + '"]'
            }
            console.log(temp_arr);
            localStorage.setItem("key", temp_arr);
            changeText("Date detected: " + text);

        } catch (err) {
            console.error('Error:', err);
            changeText("Error processing image.");
        }

        cancelAnimationFrame(animationId);

        // Replace button with Confirm/Cancel
        controls.innerHTML = `
            <button id="confirm" class="btn btn-success">Confirm</button>
            <button id="retry" class="btn btn-secondary">Retry</button>
        `;
    }
    if (event.target.id === 'guess-bb') {
        try {
            const response = await fetch('http://127.0.0.1:5000/guessTime', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"item":"cheese"})
            });

            const json = await response.json();  // backend returns JSON here
            console.log("Response JSON:", json);
            changeText("Estimated expiry date: " + json.date);

        } catch (err) {
            console.error('Error:', err);
            changeText("Error processing image.");
        }

        cancelAnimationFrame(animationId);

        // Replace buttons
        controls.innerHTML = `
            <button id="confirm" class="btn btn-success">Confirm</button>
            <button id="cancel" class="btn btn-secondary">Cancel</button>
        `;
    }

    // Handle "Cancel"
    if (event.target.id === 'retry') {
        isFrozen = false;
        var temp_arr = '[' + localStorage.getItem("key") + ']';
            console.log(temp_arr);
            temp_arr = JSON.parse(temp_arr);
            console.log(temp_arr[temp_arr.length - 1]);
            temp_arr[temp_arr.length - 1].pop();
            console.log(temp_arr[temp_arr.length - 1]);
            for (let i = 0; i < temp_arr.length; i++) {
                temp_arr[i] = '["' + temp_arr[i].join('", "') + '"]'
            }
            console.log(temp_arr);
            localStorage.setItem("key", temp_arr);
        changeText("Take a photo to begin");
        drawFrame();
        // Restore original button
        controls.innerHTML = `
            <button id="take-bb" class="btn btn-primary">Find Item</button>
        `;
    }

    // Handle "Confirm"
    if (event.target.id === 'confirm') {
        controls.innerHTML = `<span>Processing...</span>`;
        // You can add more functionality here
    }
});
