import './style.css'
import viteLogo from '/vite.svg'

document.querySelector('#app').innerHTML = /*html*/ `
<div id="logo"></div>
<form id="login">
    <video id="video" width="384" height="384" autoplay></video>
    <canvas id="canvas" width="384" height="384" style="display:none;"></canvas>
    <button id="take-bb">Find Best Before Date</button>
<form>
`
