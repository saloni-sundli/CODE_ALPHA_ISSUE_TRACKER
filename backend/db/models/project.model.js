import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectNames: {
      type: [String],  
      default: [],
      unique: true,
            required: true,     
    }
},{timestamps:true});

export const Project = mongoose.model("Project", projectSchema);