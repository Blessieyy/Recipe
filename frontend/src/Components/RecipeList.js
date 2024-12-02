import React, { useEffect, useState } from "react";
import { getRecipes } from "../api";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes(page, limit);
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };
    fetchRecipes();
  }, [page, limit]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes available</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <p>{recipe.category}</p>
              <p>{recipe.recipeList}</p>
              <img src={recipe.image} alt={recipe.name} />
            </li>
          ))}
        </ul>
      )}
      <div>
        <button onClick={prevPage} disabled={page <= 1}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default RecipeList;
