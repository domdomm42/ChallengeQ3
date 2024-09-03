import express from "express";
import { Issue } from "../models/issueModel.js";

const router = express.Router();

// GET ALL ISSUES
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find();
    res.send(issues);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET SINGLE ISSUE BY ID
router.get("/:id", async (req, res) => {
  try {
    const issue = await Issue.findOne({ id: req.params.id });
    if (!issue) {
      return res.status(404).send({ error: "Issue not found" });
    }
    res.send(issue);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// CREATE NEW ISSUE
router.post("/", async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    console.log("Created new issue: ", newIssue);
    res.status(201).send(newIssue);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// UPDATE ISSUE BY ID
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title && !req.body.description) {
      return res.status(400).send({
        message: "Please add in a new title or description",
      });
    }

    const updatedIssue = await Issue.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedIssue) {
      return res.status(404).send({ error: "Issue not found" });
    }
    console.log("Updated:", updatedIssue);
    res.send(updatedIssue);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
