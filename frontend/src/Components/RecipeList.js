import React, { useEffect, useState } from "react";
import { getRecipes } from "../api";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../Components/RecipeCard"; // Importing RecipeCard component

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add");
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes(page, limit);
        setRecipes(response.data.recipes);
        console.log(response.data.recipes);
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
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
      <div>
        <button onClick={handleClick}>Add Recipe</button>
      </div>
      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default RecipeList;
