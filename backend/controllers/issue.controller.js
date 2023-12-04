import {Issue} from "../db/models/issue.model.js";

export const getRaisedIssues = async (req, res) => {
    const allIssues = await Issue.find();
    res.json(allIssues);
};
 
export const raiseIssue = async (req, res) => {
  try {
    const { title, description, status,
      severity, id, projectname} = req.body;


    const newIssue = new Issue({
      title,
      description,
      status,
      severity,
      createdBy: id,
      projectTitle: projectname,
    });

    const savedIssue = await newIssue.save();

    res.status(201).json({ success: true, issue: savedIssue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

 
export const removeIssue = async (req, res) => {
  const { id } = req.params; 

  try {
    const deletedIssue = await Issue.findByIdAndDelete(id);

    if (!deletedIssue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }

    res.status(200).json({ success: true, issue: deletedIssue, message: 'Issue deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
 
export const updateIssue = async (req, res) => {
      const { id } = req.params; // Assuming the ID is in the request parameters
      const { commentValue, ids } = req.body;
      const comments = [{ comment: commentValue , commentedBy: ids}];
    
      try {
        // Find the issue by ID and update its fields
        const updatedIssue = await Issue.findByIdAndUpdate(
          id,
          {
            $push: { comments: { $each: comments } }, // Add new comments to the array
          },
          { new: true, runValidators: true }
        );
    
        if (!updatedIssue) {
          // If the issue with the provided ID is not found
          return res.status(404).json({ success: false, message: 'Issue not found' });
        }
    
        res.status(200).json({ success: true, issue: updatedIssue, message: 'Issue updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
};