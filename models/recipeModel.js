import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    Name :{
        type: String,
        required: true

    },
    Description :{
        type:String,
        required:true
    },
    Category :{
        type:String,
        required:true
    },
    RecipeList :{
        type: String,
        required:true

    },
    Image:{
        type: String,
        required:false,
        
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model("Recipe", recipeSchema )