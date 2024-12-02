import Recipe from "../models/recipeModel.js";


const addRecipe = async (req, res) => {
  try {
    const { name, description, category, recipeList, image } = req.body;

    
    if (image && !/^data:image\/[a-zA-Z]+;base64,/.test(image)) {
      return res.status(400).json({ error: "Invalid base64 image format" });
    }

    const newRecipe = await Recipe.create({
      name,
      description,
      category,
      recipeList,
      image, 
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the recipe" });
  }
};
const getRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const recipes = await Recipe.find().skip(skip).limit(limit);
    const numOfRecipes = await Recipe.countDocuments();

    res.status(200).json({ recipes, numOfRecipes, page, limit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occoured while fetching recipes" });
  }
};
const getRecipe = async (req, res) => {
  try {
    const recipeId = await req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.status(200).json(recipe);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(400).json({
        error: "Bra stop tweakin and get the correct ID or ill boom you",
      });
    } else {
      res.status(500).json({ error: "nah bro your server is tweakin" });
    }
  }
};

export default {
  addRecipe,
  getRecipes,
  getRecipe,
};
