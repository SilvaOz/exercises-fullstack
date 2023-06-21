// import db from '../lowdbConfig.js'
import {v4 as uuid} from 'uuid'

const recipes = [
    {
        "id": "1",
        name: "Pasta Alfredo",
        ingredients: ["pasta", "mantequilla", "queso parmesano", "nata", "ajo"],
        instructions: "1. Cocina la pasta según las instrucciones del paquete...\n2. Derrite la mantequilla en una sartén..."
    },
    {
        "id": "2",
        name: "Ensalada César",
        ingredients: ["lechuga", "pollo", "crutones", "queso parmesano", "salsa César"],
        instructions: "1. Lava y corta la lechuga en trozos...\n2. Cocina el pollo y córtalo en tiras...\n3. Mezcla la lechuga..."
    },
]

export const getRecipes = (req, res) => {
    res.send(recipes);
}

export const createRecipes =  (req, res) => {
    let newRecipes = req.body
    newRecipes.id = uuid()
    recipes.push(newRecipes)
    res.send(recipes)
};
export const updateRecipe = (req, res) => {
    const { id } = req.params;
    const { name, ingredients, instructions } = req.body;

    const recipeToUpdate = recipes.find(recipe => recipe.id === parseInt(id));
    if (!recipeToUpdate) {
        res.status(404).send({ success: false, message: 'Recipe not found' });
        return;
    }

    recipeToUpdate.name = name;
    recipeToUpdate.ingredients = ingredients;
    recipeToUpdate.instructions = instructions;

    res.send({ success: true });
};

export const deleteRecipe = (req, res) => {
    const { id } = req.params;

    const recipeIndex = recipes.findIndex(recipe => recipe.id === (id));
    if (recipeIndex === -1) {
        res.status(404).send({ success: false, message: 'Recipe not found' });
        return;
    }

    recipes.splice(recipeIndex, 1);

    res.send({ success: true });
};





