import './myfridge.css';

import React, { useState, useEffect, useRef } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

const STORAGE_KEY = "ingredients";

const getIngredients = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const setIngredients = (arr) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
};

const MyFridgeApp = () => {
  const [ingredients, setIngredientsState] = React.useState(getIngredients());

  const addIngredient = () => {
    window.location.href = '/getitem/';
  };

  const mainRef = React.useRef(null);
  const containerHeight = 780;
  const headerHeight = 64;

  // Delete ingredient by index
  const handleDelete = (idx) => {
    const newArr = [...ingredients];
    newArr.splice(idx, 1);
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
          height: `${containerHeight - headerHeight}px`,
          boxSizing: 'border-box',
        },
      },
      ingredients.map((item, index) =>
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
          'fixed w-14 h-14 bg-pink-300 border-2 border-black rounded-full flex items-center justify-center text-black font-bold text-3xl',
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

// Render
const rootElement = document.getElementById('root-myfridge');
if (!rootElement) {
  throw new Error('No root element found. Please add <div id="root-myfridge"></div> to your HTML.');
}
const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(MyFridgeApp));
