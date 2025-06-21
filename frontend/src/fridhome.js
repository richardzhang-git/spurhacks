// Inside your App component, modify the Ingredients Card div:
React.createElement(
  'div',
  {
    id: 'fridge',
    className: 'card relative p-4 min-h-[250px] flex flex-col justify-start items-center text-black font-mono text-xl cursor-pointer rounded-lg overflow-hidden',
    onClick: () => window.location.href = './myfridge.html' // Add this onClick handler
  },
  // ... rest of the Ingredients Card content (image, text)
),