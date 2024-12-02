import express from "express";
import recipeConroller from "../controllers/recipeConroller.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/user/", userController.registerUser);
router.post("/user/login", userController.loginUser);

router.post("/recipe", recipeConroller.addRecipe);
router.get("/recipe", recipeConroller.getRecipes);
router.get("/recipe/:id", recipeConroller.getRecipe);

export default router;
