import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = /*html*/ `
<div id="logo"></div>
<form id="login">
    <input type="text" placeholder="Username" class="input input-xl" "id="username />
    <input type="password" placeholder="Password" class="input input-xl" id="password" />
    <button class="btn btn-primary btn-xl" id="submit">Enter</button>
<form>
`

setupCounter(document.querySelector('#counter'))
