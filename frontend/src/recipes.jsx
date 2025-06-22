import React, { useState } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';
import './style.css'; // Ensure CSS is imported

const RecipesApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false); // <-- Loader state

  const handleButtonClick = async () => {
    setLoading(true); // Start loader
    try {
      var temp_arr = localStorage.getItem("key");
      console.log(temp_arr, "was drawn from storage")
      temp_arr = JSON.parse(temp_arr);
      var ingredient_arr = [];
      for (let i = 2; i < temp_arr.length; i++) {
        ingredient_arr.push({ ingredient: temp_arr[i]["name"], expiry: temp_arr[i]["daysUntilExpire"] });
        console.log(i);
      }
        console.log("oh", ingredient_arr);
      const response = await fetch('http://localhost:8080/getrecipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredient_arr }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data.responses);
      setGenerated(true);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handleHomeClick = () => {
    window.location.href = '/home/';
  };

  return React.createElement(
    'div',
    {
      style: {
        width: '360px',
        height: '780px',
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
        onClick: handleHomeClick,
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
            cursor: loading ? 'not-allowed' : 'pointer',
            textAlign: 'center',
            color: 'black',
            opacity: loading ? 0.6 : 1,
            position: 'relative',
          },
          onClick: loading ? undefined : handleButtonClick,
          disabled: loading,
        },
        loading
          ? React.createElement(
              'span',
              { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' } },
              React.createElement(
                'span',
                {
                  className: 'loader',
                  style: {
                    display: 'inline-block',
                    width: '18px',
                    height: '18px',
                    border: '3px solid #888',
                    borderTop: '3px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  },
                }
              ),
              'Loading...'
            )
          : generated ? 'Reroll' : 'Generate'
      )
    ),
    // Recipe Cards (hidden until generated)
    generated &&
      React.createElement(
        'div',
        {
          style: {
            overflowY: 'auto',
            height: 'calc(100% - 200px)',
            padding: '0 16px',
            color: 'black',
          },
        },
        recipes.map((recipe, i) =>
          React.createElement(
            'div',
            {
              key: i,
              style: {
                margin: '16px 0',
                backgroundColor: '#d3d3d3',
                border: '1px solid black',
                padding: '16px',
                textAlign: 'left',
                height: 'auto',
                minHeight: '128px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                fontFamily: 'monospace',
                position: 'relative',
                overflow: 'hidden',
                color: 'black',
                cursor: 'default',
              },
            },
            React.createElement(
              'h2',
              {
                style: {
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.1em',
                  textAlign: 'center',
                  color: 'black',
                },
              },
              recipe.recipeName
            ),
            recipe.ingredients && React.createElement(
              'h3',
              {
                style: {
                  fontSize: '1em',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  textAlign: 'center',
                },
              },
              'Ingredients'
            ),
            recipe.ingredients && React.createElement(
              'ul',
              {
                style: {
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '0.9em',
                  lineHeight: '1.3em',
                  listStyleType: 'circle',
                },
              },
              recipe.ingredients.map((ingredient, idx) =>
                React.createElement('li', { key: idx }, ingredient)
              )
            ),
            React.createElement(
              'h3',
              {
                style: {
                  fontSize: '1em',
                  fontWeight: 'bold',
                  marginTop: '16px',
                  marginBottom: '8px',
                  textAlign: 'center',
                },
              },
              'Steps'
            ),
            React.createElement(
              'ol',
              {
                style: {
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '0.9em',
                  lineHeight: '1.3em',
                  listStyleType: 'decimal',
                  listStylePosition: 'inside',
                },
              },
              Array.isArray(recipe.steps)
                ? recipe.steps.map((step, idx) =>
                    React.createElement('li', { key: idx }, step)
                  )
                : React.createElement('li', {}, 'No steps provided')
            )
          )
        )
      )
  );
};

// Add loader animation CSS
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

// Mount
const rootElement = document.getElementById('root-recipes');
if (!rootElement) {
  throw new Error('Missing <div id="root-recipes"></div> in your HTML.');
}
const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(RecipesApp));