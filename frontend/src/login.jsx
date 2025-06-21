import React from 'react';

export default function Login() {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden"
      style={{
        width: 360,
        height: 780,
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div id="logo" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="/Logo.png" alt="Logo" />
      </div>

      <form
        id="login"
        style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 20px', width: '100%' }}
      >
        <input type="text" placeholder="Username" className="input input-xl" id="username" />
        <input type="password" placeholder="Password" className="input input-xl" id="password" />
        <button
          className="btn btn-primary btn-xl"
          type="button"
          onClick={() => window.location.href = '/home/'}
        >
          Enter
        </button>
      </form>
    </div>
  );
}
