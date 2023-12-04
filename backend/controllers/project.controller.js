import {Project} from "../db/models/project.model.js";

export const createProject = async (req,res) => {
    const {name} = req.body;

  try {
    const existingProject = await Project.findOne();

    if (existingProject) {
      if (Array.isArray(existingProject.projectNames)) {
        existingProject.projectNames.push(name);
      } else {
        existingProject.projectNames = [existingProject.projectNames, name];
      }

      await existingProject.save();
      res.status(200).send("Project updated successfully");
    } else {
      const newProject = new Project({ projectNames: [name] });
      await newProject.save();
      res.status(201).send("Project created successfully");
    }
  } catch (error) {
    console.error("Error updating/creating project", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllProject = async (req, res) => {
    const projectNames = await Project.find();
    res.json(projectNames);
};