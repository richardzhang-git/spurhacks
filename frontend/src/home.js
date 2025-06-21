import './style.css'
import viteLogo from '/vite.svg'

document.querySelector('#app').innerHTML = /*html*/ `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SpurHacks</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="home.js"></script>
</body>
</html>

import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')

  app.innerHTML = `
    <div class="container">
      <header>
        <h1>Home</h1>
        <div class="profile-btn"></div>
      </header>

      <main>
        <div class="card" id="fridge">
          <p>{fridge & ingredient}</p>
        </div>

        <div class="card" id="recipes">
          <p>{recipes}</p>
        </div>
      </main>
    </div>
  `
})
