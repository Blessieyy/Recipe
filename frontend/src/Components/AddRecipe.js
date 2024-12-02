import React, { useState } from "react";
import { addRecipe } from "../api";

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [recipeList, setRecipeList] = useState("");
  const [image, setImage] = useState(null); // Store the file
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert the image file to base64
      reader.onloadend = () => {
        setImage(reader.result); // Set the base64 string as the image state
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = { name, description, category, recipeList, image };

    try {
      const response = await addRecipe(recipeData); // Send the recipe data including base64 image
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
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Add Recipe</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default AddRecipe;
