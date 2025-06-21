import './style.css'
import viteLogo from '/vite.svg'

//localStorage.setItem("key", ['["dummy1", "d1"]', '["dummy2", "d2"]']);
//console.log(localStorage.getItem("key"));

if (localStorage.getItem("key") === null) {
    localStorage.setItem("key", [["dummy1", "d1"], ["dummy2", "d2"]]);
    console.log("hello");
}
document.querySelector('#app').innerHTML = /*html*/ `
<div id="logo"></div>
<form id="login">
    <input type="text" placeholder="Username" class="input input-xl" id="username" />
    <input type="password" placeholder="Password" class="input input-xl" id="password" />
    <button class="btn btn-primary btn-xl" id="submit">Enter</button>
<form>
`
