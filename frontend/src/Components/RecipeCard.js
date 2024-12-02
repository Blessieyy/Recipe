import React from "react";


export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
    
      <div className="recipe-card-info">
        <img className="author-img" src={recipe.authorImg} alt="Author" />
        <p className="recipe-title">{recipe.Name}</p>
        <p className="recipe-desc">{recipe.Description}</p>
        <a className="view-btn" href="#!">
          VIEW RECIPE
        </a>
      </div>
    </div>
  );
}
