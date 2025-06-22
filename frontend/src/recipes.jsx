import React, { useState } from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

const RecipesApp = () => {
  const [recipes, setRecipes] = useState([]); // Start with an empty array for recipes
  const [generated, setGenerated] = useState(false);

  const handleButtonClick = async () => {
    try {
        var temp_arr = '[' + localStorage.getItem("key") + ']';
        temp_arr = JSON.parse(temp_arr);
        console.log("hello there", temp_arr);
        var ingredient_arr = []
        for (let i = 2; i < temp_arr.length; i++) {
            ingredient_arr.push({ingredient: temp_arr[i][0], expiry: temp_arr[i][1]});
               console.log(temp_arr[i]);
        }
        console.log(ingredient_arr);
      // Correct URL for Flask backend API
      const response = await fetch('http://localhost:8080/getrecipes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ingredients: ingredient_arr,
          }),
        });
      console.log('recipes:', response);
      // Check if the response is successful (status code 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log(data); // Log to check the response

      // Update the state with the recipes fetched from the Flask API
      setRecipes(data.responses);
      setGenerated(true); // Mark the recipes as generated

    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
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
      React.createElement(
        'div',
        {
          style: {
            overflowY: 'auto',  // Allows scrolling
            height: 'calc(100% - 200px)',  // Ensures the scrolling area takes up remaining space
            padding: '0 16px',
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
                cursor: 'default',  // Makes it clear that the card is no longer clickable
              },
            },
            React.createElement(
              'h2',
              {
                style: {
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  fontSize: '1.1em',  // Slightly smaller font
                  textAlign: 'center',
                },
              },
              recipe.recipeName // The title comes from the API response
            ),

            // Ingredients List (if present in the response)
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
                  fontSize: '0.9em',  // Slightly smaller font for ingredients
                  lineHeight: '1.3em',
                  listStyleType: 'circle',
                },
              },
              recipe.ingredients.map((ingredient, idx) =>
                React.createElement('li', { key: idx }, ingredient)
              )
            ),

            // Steps List (if present in the response)
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
                  fontSize: '0.9em',  // Smaller font for steps
                  lineHeight: '1.3em',  // More compact line height
                  listStyleType: 'decimal',
                  listStylePosition: 'inside',
                },
              },
                console.log(recipe),
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

// Mount
const rootElement = document.getElementById('root-recipes');

if (!rootElement) {
  throw new Error('Missing <div id="root-recipes"></div> in your HTML.');
}

const root = ReactDOM.createRoot(rootElement);
root.render(React.createElement(RecipesApp));
