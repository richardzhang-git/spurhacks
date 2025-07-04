import React, { useState } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';
import './style.css';

const RecipesApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      let temp_arr = localStorage.getItem("key");
      console.log(temp_arr, "was drawn from storage");
      temp_arr = JSON.parse('[' + temp_arr + ']');

      const ingredient_arr = [];
      for (let i = 2; i < temp_arr.length; i++) {
        ingredient_arr.push({
          ingredient: temp_arr[i]["name"],
          expiry: temp_arr[i]["daysUntilExpire"],
        });
      }
      console.log("Ingredients array:", ingredient_arr);

      const response = await fetch('http://localhost:8080/getrecipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredient_arr }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setRecipes(data.responses);
      setGenerated(true);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
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
        position: 'relative',
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
          className: `home-icon${isShaking ? ' shaking' : ''}`,
          style: {
            width: '32px',
            height: '32px',
            marginRight: '8px',
            cursor: 'pointer',
          },
          onClick: (e) => {
            if (isShaking) return; // prevent double clicks while shaking
            setIsShaking(true);
            setTimeout(() => {
              setIsShaking(false);
              window.location.href = "/home/";
            }, 500); // shake duration + buffer
          },
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
    // Button
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
            backgroundColor: '#d6bd94',
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
              {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                },
              },
              React.createElement('span', {
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
              }),
              'Loading...'
            )
          : generated ? 'Reroll' : 'Generate'
      )
    ),
    // Recipes + translucent background
    generated &&
      React.createElement(
            'div',
            {
              key: 'overlay-bg',
              style: {
                position: 'absolute',
                top: 170,
                left: 20,
                width: '320px',
                height: '575px',
                backgroundColor: 'rgba(251, 229, 194, 0.7)',
                zIndex: 0,
              },
            }
          ),
      React.createElement(
        'div',
        {
          style: {
            position: 'relative',
            overflowY: 'auto',
            height: 'calc(100% - 200px)',
            padding: '0 16px',
            color: 'black',
          },
        },
        [
          // Translucent background behind cards
          // Recipe cards
          ...recipes.map((recipe, i) => [
              React.createElement(
                'div',
                {
                  key: `card-${i}`,
                  style: {
                    position: 'relative',
                    zIndex: 1,
                    margin: '16px 0 8px',
                    backgroundColor: 'rgba(251, 229, 194, 0)',
                    border: '0px solid black',
                    padding: '16px',
                    textAlign: 'left',
                    minHeight: '128px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    fontFamily: 'monospace',
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
                recipe.ingredients &&
                  React.createElement(
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
                recipe.ingredients &&
                  React.createElement(
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
              ),
              // Horizontal line after each card except the last one
              i < recipes.length - 1 &&
                React.createElement('div', {
                  key: `line-${i}`,
                  style: {
                    width: '320px',
                    height: '1px',
                    backgroundColor: 'black',
                    margin: '8px auto',
                    zIndex: 1,
                  },
                }),
            ])

        ]
      )
  );
};

// Inject loader and animations CSS
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  to { transform: rotate(360deg); }
}

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

// Mount the component
const rootElement = document.getElementById('root-recipes');
if (!rootElement) {
  throw new Error('Missing <div id="root-recipes"></div> in your HTML.');
}
const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(RecipesApp));
