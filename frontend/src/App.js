import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AddRecipe from "./Components/AddRecipe";
import RecipeList from "./Components/RecipeList";
import RecipeDetail from "./Components/RecipeDetail";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/recipelist" element={<RecipeList />} />
        <Route path="/recipedetails" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
