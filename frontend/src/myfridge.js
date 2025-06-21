import './myfridge.css';

import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

const MyFridgeApp = () => {
  const ingredients = [
    { name: '[ingredient]', daysUntilExpire: '_' },
    { name: '', daysUntilExpire: '' },
    { name: '', daysUntilExpire: '' },
    { name: '', daysUntilExpire: '' },
    { name: '', daysUntilExpire: '' },
    { name: '', daysUntilExpire: '' },
  ];

  return React.createElement(
    'div',
    {
      className: 'bg-white rounded-lg overflow-hidden border border-black',
      style: {
        width: '360px',
        height: '780px',
        backgroundImage: 'url(/insidefridge.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    },
    // children go here
    React.createElement(
      'header',
      { className: 'flex items-center p-4 border-b-2 border-black bg-white' },
      React.createElement(
        'img',
        {
          src: 'public/home.png',
          alt: 'Home',
          className: 'w-8 h-8 mr-2 cursor-pointer',
          onClick: () => window.location.href = './index.html'
        }
      ),
      React.createElement(
        'h1',
        { className: 'text-3xl font-extrabold text-black uppercase tracking-wider font-mono' },
        'My Fridge'
      )
    ),

    React.createElement(
      'main',
      { className: 'p-4 space-y-4 relative' },
      ingredients.map((item, index) =>
        React.createElement(
          'div',
          {
            key: index,
            className: `bg-gray-200 border border-black p-4 rounded-lg flex items-center ${item.name ? '' : 'min-h-[80px]'}`
          },
          item.name && React.createElement('div', {
            className: 'w-8 h-8 rounded mr-4',
            style: { backgroundColor: '#FADADD' }
          }),
          React.createElement(
            'div',
            null,
            React.createElement(
              'p',
              { className: 'text-black font-mono text-lg' },
              item.name || ''
            ),
            item.name && React.createElement(
              'p',
              { className: 'text-black font-mono text-sm' },
              `[${item.daysUntilExpire} Days until expire]`
            )
          )
        )
      ),
      // Pink button positioned within the main container
      React.createElement(
        'button',
        {
          className: 'absolute w-14 h-14 bg-pink-300 border-2 border-black rounded-full flex items-center justify-center text-black font-bold text-3xl',
          'aria-label': 'Add Item',
          style: {
            bottom: '-70px',
            right: '20px'
          }
        },
        '+'
      )
    )
  );
};

// Render
const rootElement = document.getElementById("root-myfridge");

if (!rootElement) {
  throw new Error('No root element found. Please add <div id="root-myfridge"></div> to your HTML.');
}

const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(MyFridgeApp));
