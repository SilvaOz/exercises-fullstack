import express from "express";
import { getRecipes, createRecipes,updateRecipe, deleteRecipe } from "./controller/recipeController.js";
import cors from "cors";





const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/recipes", getRecipes);

app.post("/recipes", createRecipes);

app.put("/recipes/:id", updateRecipe);

app.delete("/recipes/:id", deleteRecipe);



app.listen(PORT, () => {
    console.log(`Server laeuft auf Port ${PORT}`);
});
