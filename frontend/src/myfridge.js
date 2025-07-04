import './myfridge.css';

import React, { useState, useEffect, useRef } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

const STORAGE_KEY = "key";

const getIngredients = () => {
  const raw = '['+localStorage.getItem(STORAGE_KEY)+']';
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const setIngredients = (arr) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr).slice(1, -1));
};

const MyFridgeApp = () => {
  const [ingredients, setIngredientsState] = React.useState(getIngredients());
  const [isShaking, setIsShaking] = React.useState(false);  // Added shaking state

  const addIngredient = () => {
    window.location.href = '/getitem/';
  };

  const mainRef = React.useRef(null);
  const containerHeight = 780;
  const headerHeight = 64;

  // Delete ingredient by index
  const handleDelete = (idx) => {
    const newArr = [...ingredients];
    console.log(idx);
    newArr.splice(idx + 2, 1);
    setIngredients(newArr);
    setIngredientsState(newArr);
  };

  // If you want to update when coming back from /getitem/
  React.useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        setIngredientsState(getIngredients());
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    // Also run once on mount
    setIngredientsState(getIngredients());
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Home icon click handler with shake effect + redirect
  const handleHomeClick = () => {
    if (isShaking) return; // prevent double clicks during shake
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      window.location.href = '/home/';
    }, 500); // shake duration + small buffer
  };

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
        className: `w-8 h-8 mr-2 cursor-pointer home-icon${isShaking ? ' shaking' : ''}`,
        onClick: handleHomeClick,
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
          height: `${containerHeight - headerHeight}px`,
          boxSizing: 'border-box',
        },
      },
      console.log("hi", ingredients),
      console.log(ingredients[2]),
      ingredients.slice(2, ingredients.length).map((item, index) =>
        React.createElement(
          'div',
          {
            key: index,
            className: `bg-gray-200 border border-black p-4 rounded-lg flex items-center justify-between ${
              item.name ? '' : 'min-h-[80px]'
            }`,
          },
          React.createElement(
            'div',
            null,
            React.createElement('p', { className: 'text-black font-mono text-lg' }, item.name || ''),
            item.name &&
              React.createElement(
                'p',
                { className: 'text-black font-mono text-sm' },
                `[Expires on ${item.daysUntilExpire}]`
              )
          ),
          React.createElement(
            'button',
            {
              className: 'ml-4 text-red-600 font-bold text-3xl px-5 py-3 rounded hover:bg-red-100',
              'aria-label': 'Delete',
              onClick: () => handleDelete(index),
              style: { marginLeft: 'auto' }
            },
            '×'
          )
        )
      )
    ),

    React.createElement(
      'button',
      {
        className:
          'fixed w-14 h-14 bg-blue-200 border-2 border-black rounded-full flex items-center justify-center text-black font-bold text-3xl',
        'aria-label': 'Add Item',
        style: {
          bottom: '32px',
          right: '32px',
          zIndex: 50,
        },
        onClick: addIngredient,
      },
      '+'
    )
  );
};

// Inject animations CSS (can be moved to your myfridge.css if preferred)
const style = document.createElement('style');
style.innerHTML = `
/* Grow on hover only when NOT shaking */
.home-icon:not(.shaking):hover {
  transform: scale(1.15);
  transition: transform 0.2s ease-in-out;
}

/* Shake (tilt) animation */
@keyframes tiltShake {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
}

.home-icon.shaking {
  animation: tiltShake 0.4s ease;
  pointer-events: none;
}
`;
document.head.appendChild(style);

// Render
const rootElement = document.getElementById('root-myfridge');
if (!rootElement) {
  throw new Error('No root element found. Please add <div id="root-myfridge"></div> to your HTML.');
}
const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(MyFridgeApp));
