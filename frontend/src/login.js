import './style.css'
import viteLogo from '/vite.svg'

document.querySelector('#app').innerHTML = /*html*/ `
  React.createElement(
      'div',
      {
        className: 'bg-white rounded-lg overflow-hidden',
        style: {
          width: '360px',
          height: '780px',
          border: 'none',
        }
        <div id="logo">
    <img src="public/logo.png" alt="Logo" />
  </div>

  <form id="login">
    <input type="text" placeholder="Username" class="input input-xl" id="username" />
    <input type="password" placeholder="Password" class="input input-xl" id="password" />
    <button class="btn btn-primary btn-xl" id="submit" type="button" onclick="window.location.href='/home/';">Enter</button>
<form>
`
