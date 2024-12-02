import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../api";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipeById(id);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <p>{recipe.category}</p>
      <p>{recipe.recipeList}</p>
      {recipe.image && <img src={recipe.image} alt={recipe.name} />}
    </div>
  );
};

export default RecipeDetail;
