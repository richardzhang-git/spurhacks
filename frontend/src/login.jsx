import React from 'react';

export default function Login() {
  const containerHeight = 780; // define this if you want dynamic height

  return (
    <div
      style={{
        width: '360px',
        height: `${containerHeight}px`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
      }}
    >
      {/* Background image with 80% opacity */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/login.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7,
          zIndex: -1
        }}
      />
      
      <div id="logo" style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        width: '280px',
        height: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src="/Logo.png" 
          alt="Logo" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>

      <form
        id="login"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          padding: '0 20px',
          width: '100%',
          marginTop: '-20px'
        }}
      >
        <input
          type="text"
          placeholder="Username"
          className="input input-xl"
          id="username"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-xl"
          id="password"
        />
        <button
          type="button"
          onClick={() => (window.location.href = '/home/')}
          style={{
            backgroundColor: '#7b4b37',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Enter
        </button>
      </form>
    </div>
  );
}
