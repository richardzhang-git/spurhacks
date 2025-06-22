import './myfridge.css';

import React, { useState, useEffect, useRef } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

const MyFridgeApp = () => {
  const ingredients = [];
  var temp_arr = localStorage.getItem("key");
  temp_arr = JSON.parse('[' + temp_arr + ']')
  for (let i = 2; i < temp_arr.length; i++) {
    ingredients.push({ name: temp_arr[i][0], daysUntilExpire: temp_arr[i][1] },)
  }

  const addIngredient = () => {
    window.location.href = '/getitem/';
  };

  const mainRef = useRef(null);
  const [mainHeight, setMainHeight] = useState(0);

  useEffect(() => {
    if (mainRef.current) {
      setMainHeight(mainRef.current.clientHeight);
    }
  }, [ingredients.length]);

  const containerHeight = 780; // container height
  const headerHeight = 64; // approx height of header (paddings + content)
  const buttonSize = 56; // 14 * 4 px = 56px button diameter
  const bottomMargin = 20; // margin from bottom edge
  const topMargin = 630;

  // Calculate button bottom relative to container
  // We want button just below main content or fixed minimum from bottom.
  let calculatedBottom = containerHeight - (headerHeight) - (buttonSize / 2) - (96*ingredients.length);
  // Clamp to bottomMargin (cannot go lower than this)
  if (calculatedBottom < bottomMargin) {
    calculatedBottom = bottomMargin;
  }
  if (calculatedBottom > topMargin) {
    calculatedBottom = topMargin;
  }

  return React.createElement(
    'div',
    {
      className: 'bg-white rounded-lg overflow-hidden border border-black relative',
      style: {
        width: '360px',
        height: `${containerHeight}px`,
        backgroundImage: 'url(/insidefridge.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      },
    },
    React.createElement(
      'header',
      { className: 'flex items-center p-4 border-b-2 border-black bg-white' },
      React.createElement('img', {
        src: '/Home.png',
        alt: 'Home',
        className: 'w-8 h-8 mr-2 cursor-pointer',
        onClick: () => (window.location.href = '/home/'),
      }),
      React.createElement(
        'h1',
        { className: 'text-3xl font-extrabold text-black uppercase tracking-wider font-mono' },
        'My Fridge'
      )
    ),

    React.createElement(
      'main',
      {
        className: 'p-4 space-y-4 overflow-auto',
        ref: mainRef,
        style: {
          height: `${containerHeight - headerHeight}px`, // fill container minus header
          boxSizing: 'border-box',
        },
      },
      ingredients.map((item, index) =>
        React.createElement(
          'div',
          {
            key: index,
            className: `bg-gray-200 border border-black p-4 rounded-lg flex items-center ${
              item.name ? '' : 'min-h-[80px]'
            }`,
          },
          item.name &&
            React.createElement('div', {
              className: 'w-8 h-8 rounded mr-4',
              style: { backgroundColor: '#FADADD' },
            }),
          React.createElement(
            'div',
            null,
            React.createElement('p', { className: 'text-black font-mono text-lg' }, item.name || ''),
            item.name &&
              React.createElement(
                'p',
                { className: 'text-black font-mono text-sm' },
                `[${item.daysUntilExpire} Days until expire]`
              )
          )
        )
      )
    ),

    // Button **outside main**, positioned relative to container
    React.createElement(
      'button',
      {
        className:
          'absolute w-14 h-14 bg-pink-300 border-2 border-black rounded-full flex items-center justify-center text-black font-bold text-3xl',
        'aria-label': 'Add Item',
        style: {
          bottom: `${calculatedBottom}px`,
          right: '20px',
        },
        onClick: addIngredient,
      },
      '+'
    )
  );
};

// Render
const rootElement = document.getElementById('root-myfridge');

if (!rootElement) {
  throw new Error('No root element found. Please add <div id="root-myfridge"></div> to your HTML.');
}

const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(MyFridgeApp));
