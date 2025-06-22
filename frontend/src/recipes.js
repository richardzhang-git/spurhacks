import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

const RecipesApp = () => {
  return React.createElement(
    'div',
    {
      style: {
        width: '360px',
        height: '780px',
        backgroundColor: 'white',
        border: '1px solid black',
        fontFamily: 'monospace',
        overflow: 'hidden'
      }
    },

    // Header with home icon and title
    React.createElement(
      'header',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid black',
          backgroundColor: 'white'
        }
      },
      React.createElement('img', {
        src: '/Home.png',
        alt: 'Home',
        style: {
          width: '32px',
          height: '32px',
          marginRight: '8px',
          cursor: 'pointer'
        },
        onClick: () => window.location.href = './index.html'
      }),
      React.createElement(
        'h1',
        {
          style: {
            fontSize: '28px',
            fontWeight: '800',
            textTransform: 'uppercase',
            color: 'black'
          }
        },
        'Recipes'
      )
    ),

    // Inputs Row
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          padding: '16px'
        }
      },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Time:',
        style: {
          padding: '4px 8px',
          border: '1px solid black',
          backgroundColor: '#f0f0f0',
          fontFamily: 'monospace'
        }
      }),
      React.createElement('input', {
        type: 'text',
        placeholder: 'Servings:',
        style: {
          padding: '4px 8px',
          border: '1px solid black',
          backgroundColor: '#f0f0f0',
          fontFamily: 'monospace'
        }
      }),
      React.createElement('button', {
        style: {
          padding: '4px 12px',
          backgroundColor: '#d1d1d1',
          border: '1px solid black',
          fontFamily: 'monospace',
          cursor: 'pointer'
        }
      }, 'Enter')
    ),

    // Reload Button
    React.createElement(
      'div',
      { style: { display: 'flex', justifyContent: 'center', padding: '8px' } },
      React.createElement('button', {
        style: {
          padding: '8px 24px',
          backgroundColor: '#d1d1d1',
          border: '1px solid black',
          fontFamily: 'monospace',
          cursor: 'pointer'
        }
      }, 'Reload')
    ),

    // Recipe Card 1
    React.createElement(
      'div',
      {
        style: {
          margin: '16px',
          backgroundColor: '#d3d3d3',
          border: '1px solid black',
          padding: '16px',
          textAlign: 'center'
        }
      },
      React.createElement('p', null, '<Recipe>'),
      React.createElement('div', {
        style: {
          marginTop: '16px',
          height: '96px',
          backgroundColor: '#fadadd',
          border: '1px solid black'
        }
      })
    ),

    // Recipe Card 2
    React.createElement('div', {
      style: {
        margin: '16px',
        height: '128px',
        backgroundColor: '#d3d3d3',
        border: '1px solid black'
      }
    }),

    // Recipe Card 3
    React.createElement('div', {
      style: {
        margin: '16px',
        height: '128px',
        backgroundColor: '#d3d3d3',
        border: '1px solid black'
      }
    })
  );
};

// Mount
const rootElement = document.getElementById("root-recipes");

if (!rootElement) {
  throw new Error('Missing <div id="root-recipes"></div> in your HTML.');
}

const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(RecipesApp));
