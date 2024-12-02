import React, { useState } from "react";
import { addRecipe } from "../api";

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [recipeList, setRecipeList] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const recipeData = { name, description, category, recipeList, image };
      const response = await addRecipe(recipeData);
      setSuccess("Recipe added successfully!");
      setError("");
    } catch (error) {
      setError(error?.response?.data?.error || "An error occurred while adding the recipe");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Recipe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <textarea
        placeholder="Recipe List"
        value={recipeList}
        onChange={(e) => setRecipeList(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Add Recipe</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default AddRecipe;
