import { useState, useEffect } from 'react';
import "./App.css"

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', instructions: '' });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3000/recipes');
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Rezepte.');
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createRecipe = async () => {

    try {
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
      if (!response.ok) {
        throw new Error('Fehler beim Erstellen des Rezepts.');
      }
      fetchRecipes();
      setNewRecipe({ name: '', ingredients: '', instructions: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Rezepts.');
      }
      fetchRecipes();
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Rezeptbuch</h1>

      <h2>Neues Rezept erstellen</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newRecipe.name}
            onChange={handleInputChange}
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              width: '100%',
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '0.5rem',
            }}
          />
        </label>
        <br />
        <label>
          Zutaten:
          <textarea
            name="ingredients"
            value={newRecipe.ingredients}
            onChange={handleInputChange}
            style={{
              borderRadius: '0.5rem',
              display: 'block',
              marginBottom: '0.5rem',
              width: '100%',
              height: '150px',
              padding: '0.5rem',
              fontSize: '1rem'
            }}
          />
        </label>
        <br />
        <label>
          Anleitung:
          <textarea
            name="instructions"
            value={newRecipe.instructions}
            onChange={handleInputChange}
            style={{
              borderRadius: '0.5rem',
              display: 'block',
              marginBottom: '0.5rem',
              width: '100%',
              height: '150px',
              padding: '0.5rem',
              fontSize: '1rem'
            }}
          />
        </label>
        <br />
        <button
          type="button"
          onClick={createRecipe}
          style={{
            backgroundColor: '#8C6B58',
            color: '#fff',
            padding: '0.5rem 2rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Rezept erstellen
        </button>
      </form>

      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h2>Rezepte</h2>
          <h3 style={{ marginBottom: '0.5rem' }}>"{recipe.name}"</h3>
          <h4>Zutaten: </h4>
          <p>{recipe.ingredients}</p>
          <h4>Anleitung:</h4>
          <p>{recipe.instructions}</p>
          <button type="button" onClick={() => deleteRecipe(recipe.id)} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Löschen
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeApp;
