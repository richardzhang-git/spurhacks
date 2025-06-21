import './style.css';

import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

const App = () => {
  return React.createElement(
    'div',
    { className: 'min-h-screen flex items-center justify-center p-4' },
    React.createElement(
      'div',
      {
        className: 'rounded-lg overflow-hidden',
        style: {
          width: '360px',
          height: '780px',
          border: 'none',
        }
      },
      // Header
      React.createElement(
        'header',
        { className: 'flex justify-between items-center p-4 border-b-2 border-black' },
        React.createElement(
          'h1',
          { className: 'text-3xl font-extrabold text-black uppercase tracking-wider font-mono' },
          'Home'
        ),
        React.createElement(
          'button',
          {
            className: 'settings-btn w-10 h-10 bg-gray-250 border-2 border-black rounded-full flex items-center justify-center text-black font-bold text-lg',
            'aria-label': 'Settings',
          },
          React.createElement(
            'svg',
            {
              className: 'w-6 h-6',
              fill: 'currentColor',
              viewBox: '0 0 24 24',
              xmlns: 'http://www.w3.org/2000/svg',
              style: { position: 'relative', top: '-2px' }
            },
            React.createElement('path', {
              d: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.43-1.13l1.77-1.03-1.5-2.6-2.1.88a6.973 6.973 0 0 0-1.66-1.66l.88-2.1-2.6-1.5-1.03 1.77a7.068 7.068 0 0 0-2.5 0l-1.03-1.77-2.6 1.5.88 2.1a6.973 6.973 0 0 0-1.66 1.66l-2.1-.88-1.5 2.6 1.77 1.03a7.068 7.068 0 0 0 0 2.5l-1.77 1.03 1.5 2.6 2.1-.88a6.973 6.973 0 0 0 1.66 1.66l-.88 2.1 2.6 1.5 1.03-1.77a7.068 7.068 0 0 0 2.5 0l1.03 1.77 2.6-1.5-.88-2.1a6.973 6.973 0 0 0 1.66-1.66l2.1.88 1.5-2.6-1.77-1.03a7.068 7.068 0 0 0 0-2.5z'
            })
          )
        )
      ),

      // Main content
      React.createElement(
        'main',
        { className: 'p-4 space-y-6' },

        // Ingredients Card
        React.createElement(
          'div',
          {
            id: 'fridge',
            className: 'card relative p-4 min-h-[250px] flex flex-col justify-start items-center text-black font-mono text-xl cursor-pointer rounded-lg overflow-hidden',
          },
          // Fridge Image - now covering the entire card
          React.createElement('img', {
            src: '/Fridge.webp', // Assuming /Fridge.webp is the correct path
            alt: 'Fridge',
            className: 'absolute inset-0 w-full h-full object-cover z-0', // z-0 to be behind text
          }),
          // Ingredients Text - overlaid on top of the image
          React.createElement(
            'p',
            {
              // Removed p-2 bg-black bg-opacity-50 rounded-lg from here
              className: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white text-3xl font-extrabold z-10', // Removed background classes
              style: { textShadow: '2px 2px 4px rgba(0,0,0,0.7)' } // Optional: kept text shadow for readability
            },
            React.createElement('span', { className: 'font-bold' }, 'Ingredients')
          ),
        ),

        // Recipes Card
        React.createElement(
          'div',
          {
            id: 'recipes',
            className: 'card relative p-4 min-h-[220px] flex flex-col justify-start items-center text-black font-mono text-xl cursor-pointer rounded-lg overflow-hidden',
          },
          // Recipe Book Image - now covering the entire card
          React.createElement('img', {
            src: '/RecipeBook.png', // Assuming /RecipeBook.png is the correct path
            alt: 'Recipe Book',
            className: 'absolute inset-0 w-full h-full object-cover z-0',
          })
          React.createElement(
            'p',
            {
              className: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white text-3xl font-extrabold z-10', // Removed background classes
              style: { textShadow: '2px 2px 4px rgba(0,0,0,0.7)' } // Optional: kept text shadow for readability
            },
            React.createElement('span', { className: 'font-bold' }, 'Recipes')
          ),
        )
      )
    )
  );
};

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('No root element found. Please add <div id="root"></div> to your HTML.');
}

const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(App));