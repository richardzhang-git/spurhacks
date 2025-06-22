import React, { useState } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

const RecipesApp = () => {
  const [generated, setGenerated] = useState(false);

  const handleButtonClick = () => {
    setGenerated(true);
    // Here you could add logic to fetch or randomize recipes on reroll
  };

  return React.createElement(
    'div',
    {
      style: {
        width: '360px',
        height: '780px',
        backgroundColor: 'white',
        border: '1px solid black',
        fontFamily: 'monospace',
        overflow: 'hidden',
      },
    },

    // Header
    React.createElement(
      'header',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid black',
          backgroundColor: 'white',
        },
      },
      React.createElement('img', {
        src: '/Home.png',
        alt: 'Home',
        style: {
          width: '32px',
          height: '32px',
          marginRight: '8px',
          cursor: 'pointer',
        },
        onClick: () => (window.location.href = './index.html'),
      }),
      React.createElement(
        'h1',
        {
          style: {
            fontSize: '28px',
            fontWeight: '800',
            textTransform: 'uppercase',
            color: 'black',
          },
        },
        'Recipes'
      )
    ),

    // Button (Generate / Reroll)
    React.createElement(
      'div',
      { style: { display: 'flex', justifyContent: 'center', padding: '16px' } },
      React.createElement(
        'button',
        {
          style: {
            width: '100%',
            maxWidth: '320px',
            padding: '8px 0',
            backgroundColor: '#d1d1d1',
            border: '1px solid black',
            fontFamily: 'monospace',
            cursor: 'pointer',
            textAlign: 'center',
          },
          onClick: handleButtonClick,
        },
        generated ? 'Reroll' : 'Generate'
      )
    ),

    // Recipe Cards (hidden until generated)
    generated &&
      [1, 2, 3].map((i) =>
        React.createElement(
          'div',
          {
            key: i,
            style: {
              margin: '16px',
              height: '128px',
              backgroundColor: '#d3d3d3',
              border: '1px solid black',
              padding: '16px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
          React.createElement('p', null, '<Recipe>')
        )
      )
  );
};

// Mount
const rootElement = document.getElementById('root-recipes');

if (!rootElement) {
  throw new Error('Missing <div id="root-recipes"></div> in your HTML.');
}

const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(RecipesApp));
